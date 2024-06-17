import React, { useMemo, useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import axios from 'axios';

// 툴바 버튼 및 포맷 정의
const formats = [
  'font', 'header', 'bold', 'italic', 'underline', 'strike',
  'blockquote', 'list', 'bullet', 'indent', 'link', 'align',
  'color', 'background', 'size', 'image'
];

// 툴바 컴포넌트 정의
export const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
      <select className="ql-header">
        <option value="1">Header 1</option>
        <option value="2">Header 2</option>
        <option value="3">Header 3</option>
        <option value="4">Header 4</option>
        <option value="5">Header 5</option>
        <option value="6">Header 6</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);

const QuillEditor = forwardRef ((props, ref) => {
  const [value, setValue] = useState("");
  const quillRef = useRef(null);

  // 파일 업로드를 위한 커스텀 훅 (예시로 구현)
  const uploadFileMutation = useMemo(() => ({
    mutateAsync: async (file) => {
      // 실제 서버 요청 로직은 여기에 구현
      try {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/board/uploadfile", file);
        console.log(res);

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ displayUrl: res.data });
          }, 1000);
        });
      } catch (error) {
        console.error(error);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ displayUrl: 'https://rohit-chouhan.gallerycdn.vsassets.io/extensions/rohit-chouhan/sweetalert2-snippet/1.1.2/1625627316335/Microsoft.VisualStudio.Services.Icons.Default' });
          }, 1000);
        });
      }
    },
  }), []);

  const handleImageUpload = useCallback(async (file) => {
    if (!file) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }

    if (quillRef.current) {
      try {
        const result = await uploadFileMutation.mutateAsync(file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);

        if (range) {
          editor.insertEmbed(range.index, 'image', result.displayUrl);
        } else {
          alert('에디터에 포커스를 맞추고 다시 시도해주세요.');
        }
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Error:', error);
      }
    }
  }, [uploadFileMutation]);

  const handleMultipleImagesUpload = useCallback(
    async (files) => {
      if (files) {
        for (const file of files) {
          await handleImageUpload(file);
        }
      }
    },
    [handleImageUpload]
  );

  const multiImageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', '');

    input.addEventListener('change', () => {
      if (input.files) {
        handleMultipleImagesUpload(input.files);
      }
    });

    input.click();
  }, [handleMultipleImagesUpload]);

  // const handleShowHtmlContent = useCallback(() => {
  //   if (quillRef.current) {
  //     const delta = quillRef.current.getEditor().getContents();
  //     const html = quillToHtml(delta);
  //     console.log(html);
  //     onContentChange(html); // HTML 내용을 부모 컴포넌트로 전달
  //   }
  // }, [onContentChange]);

  const quillToHtml = useCallback((delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    return converter.convert();
  }, []);

  const handleGetContent = useCallback(() => {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      const html = quillToHtml(delta);
      setValue(html); // 에디터 내용을 상태로 설정
    }
  }, [quillToHtml]);

  function sendContentsToParent() {
    if(quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      const html = quillToHtml(delta);

      console.log(html);

      return html;
    }
  };

  useImperativeHandle(ref, () => ({
    sendContentsToParent
  }));

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: multiImageHandler,
      },
    },
  }), [multiImageHandler]);

  return (
    <div>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        style={{ height: '500px' }}
      />
    </div>
  );
});

export default QuillEditor;

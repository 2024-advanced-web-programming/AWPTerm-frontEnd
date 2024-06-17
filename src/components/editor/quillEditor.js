import React, { useMemo, useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// 툴바 버튼 및 포맷 정의
const formats = [
  'font', 'header', 'bold', 'italic', 'underline', 'strike',
  'blockquote', 'list', 'bullet', 'indent', 'link', 'align',
  'color', 'background', 'size', 'h1'
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

const QuillEditor = () => {
  const [value, setValue] = useState("");
  const quillRef = useRef(null);

  // 파일 업로드를 위한 커스텀 훅 (예시로 구현)
  const uploadFileMutation = {
    mutateAsync: async (file) => {
      // 서버로 파일 업로드 구현
      // 예시로 파일의 URL을 반환
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ displayUrl: URL.createObjectURL(file) });
        }, 1000);
      });
    },
  };

  const handleImageUpload = async (file) => {
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
  };

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

  const multiImageHandler = () => {
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
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar", // 툴바 컨테이너 설정
      handlers: {
        image: multiImageHandler,
      },
    },
  }), [multiImageHandler]);

  return (
    <div>
      <CustomToolbar /> {/* CustomToolbar 컴포넌트 삽입 */}
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
}

export default QuillEditor;

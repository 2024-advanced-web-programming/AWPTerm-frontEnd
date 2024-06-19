import Swal from "sweetalert2";

export const checkFileSize = (file) => {
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
        Swal.fire({
            title: "허용되는 파일 사이즈는 최대 10MB에요!",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500
          });
        return false;
      }
      return true;
}

export const checkIsBlank = (content) => {
  // 이미지를 포함한 HTML을 검사하여 이미지 이외의 콘텐츠가 있는지 확인
  const strippedContent = stripHtmlTags(content);
  const hasOnlyImages = /<img\b[^>]*>/i.test(content) && strippedContent.replace(/\s/g, '') === '';

  // 이미지 태그만 있는 경우 false 반환
  if (hasOnlyImages) {
    return false;
  }

  // 이미지 이외의 콘텐츠가 있는 경우
  return strippedContent.replace(/\s/g, '') === '';
}

function stripHtmlTags(html) {
  // HTML 태그 제거하기
  return html.replace(/<[^>]+>/g, '');
}
export const getFirstImageFromContent = (content) => {
    // DOMParser를 사용하여 HTML 문자열을 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // 첫 번째 img 태그를 찾음
    const firstImg = doc.querySelector('img');

    // img 태그가 존재하면 src 속성 값을 반환, 그렇지 않으면 null 반환
    return firstImg ? firstImg.src : null;
}

export const getYoutubeThumbnail = (url) => {
    // 유튜브 영상 ID를 추출하기 위한 정규식
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      const videoId = match[1];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      return null;
    }
  };
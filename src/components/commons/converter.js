export const formatDateString = (dateString) => {
    console.log(dateString);
    
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 년, 월, 일 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();

    // 시간, 분, 초 추출
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 오전/오후 구분
    const period = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    // 숫자가 10보다 작을 경우 앞에 0을 추가하여 두 자리로 만듦
    const twoDigitFormat = (number) => (number < 10 ? '0' : '') + number;

    return `${year}년 ${month}월 ${day}일 ${period} ${hours}시 ${twoDigitFormat(minutes)}분 ${twoDigitFormat(seconds)}초`;
}
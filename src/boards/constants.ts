export const bdConstants: any = {
  prefix: 'bd',
  privateColumn: ['bd_lists_auth', 'bd_write_auth', 'bd_view_auth'],
  type: {
    notice: 1, // 공지사항
    basic: 2, // 일반게시글
    secret: 3, // 비밀글
    link: 4, // 외부링크 게시글
  },
  status: {
    delete: -1, // 게시판 삭제
    unused: 0, // 게시판 미사용
    registration: 1, // 게시판 사용 상태
  },
};
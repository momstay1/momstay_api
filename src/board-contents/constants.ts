export const bcConstants: any = {
  prefix: 'bc',
  privateColumn: ['bc_password'],
  type: {
    notice: 1, // 공지사항
    basic: 2, // 일반게시글
    secret: 3, // 비밀글
    link: 4, // 외부링크 게시글
  },
  status: {
    delete: 0, // 게시글 삭제
    uncertified: 1, // 게시글 미인증 상태
    registration: 2, // 게시글 등록 상태
  },
};
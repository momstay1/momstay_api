export const usersConstant = {
  prefix: 'user',
  adminPrefix: 'admin',
  privateColumn: ['user_password', 'user_signupVerifyToken'],
  adminPrivateColumn: ['admin_password'],
  status: {
    delete: 0, // 회원 삭제 상태
    uncertified: 1, // 회원 미인증 상태
    registration: 2, // 회원 등록 상태
    dormant: 5, // 회원 휴면 상태
    leave: 9, // 회원 탈퇴 상태
  },
  default: {
    group_idx: 2, // 회원 기본 그룹
  },
  admin: {
    group_idx: 1, // 회원 기본 그룹
  }
};

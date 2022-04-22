export const usersConstant = {
  prefix: 'user',
  privateModel: ['user_password', 'user_signupVerifyToken'],
  status: {
    del: 0, // 회원 삭제 상태
    reg: 1, // 회원 등록 상태
  },
};

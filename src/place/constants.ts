export const placeConstant = {
  prefix: 'place',
  privateColumn: [],
  status: {
    delete: 0, // 현장 삭제 상태
    schedule: 1, // 현장 예정 상태
    ongoing: 2, // 현장 진행중 상태
    close: 3, // 현장 종료 상태
  },
  default: {
    status: 1, // 현장 예정 상태
    type: 'apartment'
  },
};

export const dftConstant = {
  prefix: 'dft',
  privateColumn: [],
  status: {
    before_work: '작업전',
    working: '작업중',
    completed_work: '작업완료',
  },
  type: {
    speckled: '반점',
    pollution: '오염',
    damage: '훼손(찢김, 찍힘, 뜯김 등)',
    duster: '걸레받이수정',
    molding: '몰딩수정',
    gypsum: '석고수정',
    door_frame: '문틀수정',
    air_conditioner: '에어컨수정',
    furniture: '가구수정',
    window_frame: '창틀수정',
    cotton_defect: '면불량',
    mold: '곰팡이',
    err_hole: '오타공',
    orther: '기타',
  },
  work_method: {
    care: '손보기',
    replacement: '교체'
  },
  createDefectBody: {
    place_idx: { type: 'string', description: '현장 idx' },
    sort1: { type: 'string', description: '동' },
    sort2: { type: 'string', description: '호수' },
    sort3: { type: 'string', description: '위치' },
    status: { type: 'string', description: '작업상태' },
    type: { type: 'string', description: '하자유형' },
    content: { type: 'string', description: '내용' },
    work_method: { type: 'string', description: '작업방법' },
    replacement_square_meter: { type: 'string', description: '교체면적(m)' },
    dft_replacement_sheet: { type: 'string', description: '교체면적(장)' },
    shooting_day: { type: 'string', description: '사진촬영일' },
    dft_origin_img: {
      type: 'string',
      format: 'binary', description: '원본사진'
    },
    dft_info_img: {
      type: 'string',
      format: 'binary', description: '정뵤표시된 사진'
    },
  }
};

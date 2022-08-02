"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dftConstant = void 0;
exports.dftConstant = {
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
    }
};
//# sourceMappingURL=constants.js.map
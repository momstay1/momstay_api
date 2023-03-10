"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcConstants = void 0;
exports.bcConstants = {
    prefix: 'bc',
    privateColumn: ['bc_password'],
    type: {
        notice: 1,
        basic: 2,
        secret: 3,
        link: 4,
        event: 5,
        new: 6,
    },
    status: {
        delete: 0,
        uncertified: 1,
        registration: 2,
        answerWait: 3,
        answerComplete: 4,
    },
};
//# sourceMappingURL=constants.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const paginate_1 = require("../paginate");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./entities/review.entity");
const deleteStatus = 1;
const registrationStatus = '2';
const depthZero = 0;
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, productService, userService, fileService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.userService = userService;
        this.fileService = fileService;
    }
    async create(userInfo, createReviewDto, files) {
        if ((0, lodash_1.get)(createReviewDto, 'depth', 0) > 0 && (0, lodash_1.get)(createReviewDto, 'group', 0) == 0) {
            throw new exceptions_1.UnprocessableEntityException('처리 할 수 없습니다.');
        }
        const prd = await this.productService.findOneIdx(+(0, lodash_1.get)(createReviewDto, 'productIdx'));
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const review_data = {
            status: (0, lodash_1.get)(createReviewDto, 'status'),
            depth: (0, lodash_1.get)(createReviewDto, 'depth', 0),
            star: (0, lodash_1.get)(createReviewDto, 'star', 0),
            product: prd,
            user: user,
            contents: (0, lodash_1.get)(createReviewDto, 'contents'),
            start: (0, lodash_1.get)(createReviewDto, 'start'),
            end: (0, lodash_1.get)(createReviewDto, 'end'),
        };
        if ((0, lodash_1.get)(createReviewDto, 'group', ''))
            review_data['group'] = (0, lodash_1.get)(createReviewDto, 'group');
        const reviewEntity = await this.reviewRepository.create(review_data);
        let review = await this.reviewRepository.save(reviewEntity);
        if ((0, lodash_1.get)(review, 'depth') == 0 && (0, lodash_1.get)(review, 'group') == 0) {
            review['group'] = review['idx'];
            review = await this.reviewRepository.save(review);
        }
        await this.averageStar(review);
        const [fileIdxs] = await this.fileService.createByRequest(files, review['idx']);
        console.log({ fileIdxs });
        let file_info;
        if ((0, lodash_1.get)(fileIdxs, ['length'], 0) > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
        }
        return { review, file_info };
    }
    findAll() {
        return `This action returns all reviews`;
    }
    async findAllIdxs(idxs) {
        if (idxs.length <= 0) {
            throw new exceptions_1.NotFoundException('잘못된 정보 입니다.');
        }
        const reviews = await this.reviewRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) },
            relations: ['product', 'user']
        });
        if (reviews.length <= 0) {
            throw new exceptions_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return reviews;
    }
    async findAllProduct(idx, options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', registrationStatus);
        const alias = 'review';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.reviewRepository.createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('review.product', 'product')
            .where(qb => {
            qb.where('`review`.`status` IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            qb.andWhere('`review`.`depth` = :depth', { depth: depthZero });
            qb.andWhere('`product`.`idx` = :productIdx', { productIdx: idx });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const review_idxs = (0, lodash_1.map)(results, o => o.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], review_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('후기 상세 이미지 파일 없음');
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async findAllUser(userInfo, options, search, order) {
        const { take, page } = options;
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', registrationStatus);
        const alias = 'review';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.reviewRepository.createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('review.product', 'product')
            .where(qb => {
            qb.where('`review`.`status` IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            qb.andWhere('`review`.`depth` = :depth', { depth: depthZero });
            qb.andWhere('`user`.`idx` = :userIdx', { userIdx: user['idx'] });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const review_idxs = (0, lodash_1.map)(results, o => o.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], review_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('후기 상세 이미지 파일 없음');
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async averageStar(review) {
        const star_data = await this.reviewRepository.createQueryBuilder('review')
            .select('SUM(`review`.`star`)', 'total_star')
            .addSelect('COUNT(`review`.`idx`)', 'review_cnt')
            .leftJoin('review.product', 'product')
            .leftJoin('review.user', 'user')
            .where(qb => {
            qb.where('`review`.`status` = :status', { status: registrationStatus });
            qb.andWhere('`product`.`idx` = :productIdx', { productIdx: review['product']['idx'] });
        })
            .execute();
        console.log({ star_data });
        const average_star = star_data[0].review_cnt != 0 ? (star_data[0].total_star / star_data[0].review_cnt).toFixed(1) : 0;
        const reviews_cnt = star_data[0].review_cnt;
        await this.productService.updateAverageStar(review['product']['idx'], {
            star: +average_star,
            reviewCount: +reviews_cnt,
        });
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new exceptions_1.NotFoundException('잘못된 정보 입니다.');
        }
        const review = await this.reviewRepository.findOne({
            where: { idx: idx },
            relations: ['product', 'user']
        });
        if (!(0, lodash_1.get)(review, 'idx', '')) {
            throw new exceptions_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return review;
    }
    async findOne(idx) {
        const review = await this.findOneIdx(idx);
        if (review['status'] == deleteStatus) {
            throw new exceptions_1.NotFoundException('삭제된 후기 입니다.');
        }
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['reviewImg'], [review['idx']]);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('후기 상세 이미지 파일 없음');
        }
        return { review, file_info };
    }
    async update(idx, userInfo, updateReviewDto, files) {
        const prevReview = await this.findOneIdx(idx);
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        if (!common_utils_1.commonUtils.isAdmin(user['group']['id'])) {
            if (prevReview['user']['idx'] != user['idx']) {
                throw new exceptions_1.UnauthorizedException('권한이 없습니다.');
            }
        }
        if ((0, lodash_1.get)(updateReviewDto, 'status', ''))
            prevReview['status'] = (0, lodash_1.get)(updateReviewDto, 'status');
        if ((0, lodash_1.get)(updateReviewDto, 'star', ''))
            prevReview['star'] = (0, lodash_1.get)(updateReviewDto, 'star');
        if ((0, lodash_1.get)(updateReviewDto, 'contents', ''))
            prevReview['contents'] = (0, lodash_1.get)(updateReviewDto, 'contents');
        const review = await this.reviewRepository.save(prevReview);
        await this.averageStar(review);
        await this.fileService.removeByRequest(updateReviewDto, review['idx'], ['reviewImg']);
        await this.fileService.createByRequest(files, review['idx']);
        let file_info;
        try {
            file_info = await this.fileService.findCategory(['reviewImg'], '' + review['idx']);
        }
        catch (error) {
            console.log({ error });
        }
        return { review, file_info };
    }
    remove(id) {
        return `This action removes a #${id} review`;
    }
    async statusUpdate(idxs, userInfo) {
        if (idxs.length <= 0) {
            throw new exceptions_1.NotFoundException('삭제할 정보가 없습니다.');
        }
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const reivews = await this.findAllIdxs(idxs);
        if (!common_utils_1.commonUtils.isAdmin(user['group']['id'])) {
            if (idxs.length > 1 || reivews.length > 1) {
                throw new exceptions_1.UnprocessableEntityException('삭제할 수 없습니다.');
            }
            if (reivews[0]['user']['idx'] != user['idx']) {
                throw new exceptions_1.UnauthorizedException('권한이 없습니다.');
            }
        }
        await this.reviewRepository.createQueryBuilder()
            .update()
            .set({ status: deleteStatus })
            .where("idx IN (:idxs)", { idxs: idxs })
            .execute();
        for (const key in reivews) {
            await this.averageStar(reivews[key]);
        }
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        users_service_1.UsersService,
        file_service_1.FileService])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map
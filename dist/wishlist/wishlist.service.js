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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistService = class WishlistService {
    constructor(wishlistRepository, userService, productService, fileService) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
        this.productService = productService;
        this.fileService = fileService;
    }
    async create(user, createWishlistDto) {
        const user_data = await this.userService.findId(user.id);
        let wishlist;
        try {
            wishlist = await this.findUserProOne(user_data.idx, createWishlistDto.product_idx);
            this.remove(wishlist.idx);
            return {};
        }
        catch (error) {
            wishlist = await this.wishlistRepository.save({
                product_idx: createWishlistDto.product_idx,
                user_idx: user_data.idx
            });
        }
        return wishlist;
    }
    findAll() {
        return `This action returns all wishlist`;
    }
    async findUserAll(userInfo) {
        if ((0, lodash_1.get)(userInfo, 'id', '') == '') {
            throw new common_1.NotFoundException('wishlist.service.findUserAll: 회원 정보가 없습니다.');
        }
        const user = await this.userService.findId(userInfo['id']);
        const wishlist = await this.wishlistRepository.find({
            where: { user_idx: user['idx'] }
        });
        if (!wishlist) {
            throw new common_1.NotFoundException('wishlist.service.findUserAll: 찜 목록이 없습니다.');
        }
        const wishlist_idxs = (0, lodash_1.map)(wishlist, o => o['product_idx']);
        const product = await this.productService.findIdxAll(wishlist_idxs);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], wishlist_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('wishlist.service.findUserAll: 위시리스트에 이미지 파일 없음');
        }
        return { product, file_info };
    }
    findOne(id) {
        return `This action returns a #${id} wishlist`;
    }
    async findUserProOne(user_idx, product_idx) {
        if (!user_idx || !product_idx) {
            throw new common_1.NotFoundException('wishlist.service.findUserProOne: 잘못된 정보 입니다.');
        }
        const wishlist = await this.wishlistRepository.findOne({
            where: { user_idx: user_idx, product_idx: product_idx },
        });
        if (!wishlist) {
            throw new common_1.NotFoundException('wishlist.service.findUserProOne: 찜 목록이 없습니다.');
        }
        return wishlist;
    }
    update(id, updateWishlistDto) {
        return `This action updates a #${id} wishlist`;
    }
    async remove(idx) {
        await this.wishlistRepository.delete(idx);
    }
};
WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.WishlistEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        product_service_1.ProductService,
        file_service_1.FileService])
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlist.service.js.map
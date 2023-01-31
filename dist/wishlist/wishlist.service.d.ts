import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistEntity } from './entities/wishlist.entity';
export declare class WishlistService {
    private wishlistRepository;
    private readonly userService;
    private readonly productService;
    constructor(wishlistRepository: Repository<WishlistEntity>, userService: UsersService, productService: ProductService);
    create(user: UsersEntity, createWishlistDto: CreateWishlistDto): Promise<any>;
    findAll(): string;
    findUserAll(user: UsersEntity): Promise<import("../product/entities/product.entity").ProductEntity[]>;
    findOne(id: number): string;
    findUserProOne(user_idx: number, product_idx: number): Promise<WishlistEntity>;
    update(id: number, updateWishlistDto: UpdateWishlistDto): string;
    remove(idx: number): Promise<void>;
}

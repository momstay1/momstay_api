import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    create(user: UsersEntity, createWishlistDto: CreateWishlistDto): Promise<any>;
    findAll(user: UsersEntity): Promise<{
        product: {};
        file_info: {};
    }>;
    findOne(id: string): string;
    update(id: string, updateWishlistDto: UpdateWishlistDto): string;
    remove(id: string): Promise<void>;
}

import { GroupsEntity } from 'src/groups/entities/group.entity';
import { LoginEntity } from 'src/login/entities/login.entity';
import { UserSnsEntity } from 'src/user-sns/entities/user-sns.entity';
export declare class UsersEntity {
    idx: number;
    status: number;
    type: string;
    id: string;
    password: string;
    setPassword(password: string): Promise<void>;
    prevPassword: string;
    name: string;
    email: string;
    language: string;
    gender: string;
    countryCode: string;
    phone: string;
    birthday: Date | string;
    other: string;
    memo: string;
    signupVerifyToken: string;
    uniqueKey: string;
    certifiInfo: string;
    oldIdx: string;
    oldData: string;
    boardContents: undefined;
    product: undefined;
    login: LoginEntity[];
    userSns: UserSnsEntity[];
    groups: GroupsEntity[];
    createdAt: Date;
    updatedAt: Date;
    leaveAt: Date;
}

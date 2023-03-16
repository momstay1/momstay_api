import { UsersEntity } from "src/users/entities/user.entity";
import { ReportContentEntity } from "./report-content.entity";
export declare class ReportCumulativeEntity {
    idx: number;
    category: string;
    foreignIdx: number;
    reportContent: ReportContentEntity;
    user: UsersEntity;
    createdAt: Date;
    updatedAt: Date;
}

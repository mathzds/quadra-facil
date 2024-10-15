import { ReserveEntity } from "src/core/reserve/entities/reserve.entity";
import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar", nullable: true })
    number: string

    @Column({ type: "varchar", enum: Roles, default: Roles.USER })
    role: Roles

    @OneToMany(() => ReserveEntity, reserve => reserve.user)
    reservations: ReserveEntity[];

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}

import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: "varchar" })
    number: string

    @Column({ type: "varchar", enum: Roles, default: Roles.USER })
    role: Roles

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}

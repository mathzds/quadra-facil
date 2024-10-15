import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum Courts {
    TENNIS = "tennis",
    BASKETBALL = "basketball",
    VOLLEYBALL = "volleyball",
    SOCCER = "soccer",
    FUTSAL = "futsal"
}

@Entity()
export class CourtEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "varchar", enum: Courts })
    type: Courts;

    @Column({ type: "boolean", default: true })
    available: boolean;

    @Column({ type: "json", nullable: true })
    availableSlots: { startTime: string; endTime: string }[];
}

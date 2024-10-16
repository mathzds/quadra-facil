import { CourtEntity } from "src/core/court/entities/court.entity";
import { UserEntity } from "src/core/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeUpdate } from "typeorm";

export enum ReservationStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELED = "canceled"
}

@Entity()
export class ReserveEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.reservations)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(() => CourtEntity, court => court.reservations)
    @JoinColumn({ name: "court_id" })
    court: CourtEntity;

    @Column({ type: "datetime" })
    startDateTime: Date;

    @Column({ type: "datetime" })
    endDateTime: Date;

    @Column({ type: "varchar", enum: ReservationStatus })
    status: ReservationStatus;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}

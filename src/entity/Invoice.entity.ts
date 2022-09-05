import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Reservation } from './Reservation.entity';

@Entity({ name: 'invoices' })
export class Invoice {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    invoice: string;

    @OneToOne(() => Reservation)
    @JoinColumn()
    reservation: Reservation;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
import { IsCurrency, IsDate, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Airline } from './Airline.entity';
import { Destination } from './Destination.entity';

@Entity({ name: 'flights' })
export class Flight {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    flight_number: number;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    @IsNotEmpty()
    departure_date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    @IsNotEmpty()
    arrival_date: Date;

    @Column()
    @IsCurrency()
    @IsNotEmpty()
    cost: number;

    @OneToOne(() => Airline)
    @JoinColumn()
    airline: Airline

    @OneToOne(() => Destination)
    @JoinColumn()
    destination: Destination;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
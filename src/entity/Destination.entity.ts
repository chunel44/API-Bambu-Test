import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Airline } from './Airline.entity';

@Entity({ name: 'travel_destiny' })
export class Destination {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    from_location: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    to_location: string;

    @ManyToOne(() => Airline, (airline) => airline.destinations, { cascade: true, onDelete: 'CASCADE' })
    airline: Airline

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
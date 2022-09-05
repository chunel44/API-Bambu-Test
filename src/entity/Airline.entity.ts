import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Destination } from './Destination.entity';

@Entity({ name: 'airlines' })
export class Airline {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Destination, (des) => des.airline, { onDelete: 'CASCADE' })
    destinations: Destination[]
}
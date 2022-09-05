import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Flight } from './Flight.entity';
import { User } from "./User.entity";

@Entity({ name: 'reservations' })
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Flight)
    @JoinColumn()
    flight: Flight;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
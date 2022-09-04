import { IsCreditCard, IsNotEmpty } from "class-validator";
import creditCardType from "credit-card-type";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from './User.entity';

@Entity({ name: 'credit_card' })
export class Card {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    @IsCreditCard()
    numberCard: string;

    @IsNotEmpty()
    type: string

    @ManyToOne(() => User, (user) => user.card)
    @IsNotEmpty()
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    setTypeCreditCard(): void {
        const visaCards = creditCardType(this.numberCard);
        this.type = visaCards[0].niceType
    }
}

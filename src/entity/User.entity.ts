import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { IsEmailAlreadyExist } from '@/utils/UniqueValidation';

import { Card } from './Card.entity';

export enum statusUser {
    PENDING = 'pending',
    ACTIVE = 'active'
}

export enum rolesUser {
    ADMIN = 'admin',
    COSTUMER = 'costumer'
}

@Entity({ name: 'customers' })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    lastName: string;

    @Exclude()
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password?: string;

    @Column()
    @IsEmailAlreadyExist({
        message: 'This $value already exists.'
    })

    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({
        type: 'enum',
        enum: statusUser,
        default: statusUser.PENDING
    })
    status: statusUser;

    @Column({ unique: true })
    confirmationCode?: string;

    @OneToMany(() => Card, (card) => card.user, { onDelete: 'CASCADE' })
    card: Card[];

    @Column({
        type: 'enum',
        enum: rolesUser,
        default: rolesUser.COSTUMER
    })
    role: rolesUser;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password!, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password!);
    }

}

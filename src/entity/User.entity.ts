import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { IsEmailAlreadyExist } from '@/utils/UniqueValidation';

import { IUser, statusUser } from './interfaces';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

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
    confirmationCode: string;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

}
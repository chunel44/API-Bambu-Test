export enum statusUser {
    PENDING = 'pending',
    ACTIVE = 'active'
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    status: statusUser;
    confirmationCode: string;
}
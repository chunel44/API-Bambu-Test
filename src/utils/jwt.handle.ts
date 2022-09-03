import jwt from 'jsonwebtoken';

import { env } from '@/config';


export const signToken = (id: string, email: string) => {
    if (!env.getEnvironmentVariable('JWT_SECRET')) {
        throw new Error('JWT Secret not found');
    }
    const secret = env.getEnvironmentVariable('JWT_SECRET') as string;
    return jwt.sign(
        { id, email },
        secret,
        { expiresIn: '24h' }
    )
}

export const isValidToken = (token: string): Promise<string> => {
    if (!env.getEnvironmentVariable('JWT_SECRET')) {
        throw new Error('JWT Secret not found');
    }

    if (token.length <= 10) {
        return Promise.reject('JWT no es válido');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, env.getEnvironmentVariable('JWT_SECRET') || '', (err, payload) => {
                if (err) return reject('JWT is not valid');
                const { id } = payload as { id: string };
                resolve(id);
            })
        } catch (error) {
            return reject('JWT is not valid');
        }
    })
}
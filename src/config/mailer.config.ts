import nodemailer from 'nodemailer';

import { env } from '@/config';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'estrada.2468@gmail.com', // generated ethereal user
        pass: env.getEnvironmentVariable('PASS_EMAIL'), // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log('Ready for seend emails');
})

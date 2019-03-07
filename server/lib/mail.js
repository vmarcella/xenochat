const sgMail = require('@sendgrid/mail');

// Set the mailgun api key
sgMail.setApiKey(process.env.SG_API_KEY);

// Generate a email template based on the type and mailInfo provided
const getTemplate = (type, mailInfo) => {
    switch (type) {
    case 'signup':
        return {
            from: process.env.EMAIL,
            to: mailInfo.user.email,
            subject: 'Signup',
            text: `
            Weclome to xenochat, ${mailInfo.user.username}! We hope that you enjoy the
            chatroom we continue to build out and look forward to any feedback you
            may have.
            `,

        };
    case 'login':
        return {
            from: process.env.EMAIL,
            to: mailInfo.user.email,
            subject: 'Login',
            text: `
            We just received a sign in for your account: ${mailInfo.user.username}
            if this was you, then you can ignore this message. 
            `,
        };
    default:
        console.log('Didnt specify a template');
        return null;
    }
};

// custom function for sending mail
const sendMail = (type, mailInfo) => {
    const mail = getTemplate(type, mailInfo);
    if (mail) {
        sgMail.send(mail);
    }
};

module.exports = {
    sendMail,
};

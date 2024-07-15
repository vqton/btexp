const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

class ContactService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async saveContact(name, email, message) {
        const db = new sqlite3.Database('landingPage.db');
        return new Promise((resolve, reject) => {
            const stmt = db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
            stmt.run(name, email, message, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.sendEmail(name, email, message)
                        .then(resolve)
                        .catch(reject);
                }
            });
        });
    }

    sendEmail(name, email, message) {
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // replace with the recipient's email
            subject: `New contact from ${name}`,
            text: message
        };

        return this.transporter.sendMail(mailOptions);
    }
}

module.exports = ContactService;

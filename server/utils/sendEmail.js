const nodemailer = require('nodemailer');
const winston = require('winston');
const config = require('config');

module.exports = async function sendEmail(recipient_email, link){
    var smtpConfig = {
        host: config.get('smtp_provider'),
        port: config.get('smtp_port') || 2525,
        auth: {
            user: config.get('smtp_username'),
            pass: config.get('smtp_password')
        }

    };

      const transporter = nodemailer.createTransport(smtpConfig);

      const info = await transporter.sendMail({
        from: 'Vulnerable-Rest-API <vicforbounty@gmail.com>',
        to: recipient_email,
        subject: 'Password Recovery',
        html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>OTP</title>
        </head>
        <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Vulnerable REST API</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Use the following link to reset your password.</p>
            <a href=${link}>Reset Password</a>
            <p style="font-size:0.9em;">Regards,<br />Vulnerable REST API</p>
            <hr style="border:none;border-top:1px solid #eee" />
          </div>
        </div>
        <!-- partial -->

        </body>
        </html>`
      })

      winston.info(info.messageId);
}

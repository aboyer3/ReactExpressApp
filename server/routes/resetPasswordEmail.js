var {User} = require('../db/models/UserSchema');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var config = require('./config')
var passport = require('passport');

router.post('/', (req, res) => {

    var token = jwt.sign({ email: req.body.email }, config.JWTsecret, {expiresIn:"2 days"}); // assigning token which be userd to activate the signed account

    User.findOne({email:req.body.email} , (e, user) => {
        if (e) {
            console.log('couldnt find acc' , e)
            res.send(e)
        }
        if (!user) {
            res.send('no user found')
            console.log('no user found')
        }
        if (user) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            nodemailer.createTestAccount((err, mailAcc) => {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.elasticemail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: config.nodemailerEmail, // generated ethereal user
                        pass: config.nodemailerPw // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: config.nodemailerEmail, // sender address
                    to: req.body.email, // list of receivers
                    subject: `reset password`, // Subject line
                    html: `
                    <!doctype html>
                    <html>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
                    <link href="https://fonts.googleapis.com/css?family=Berkshire+Swash|Cookie|Great+Vibes|Londrina+Solid|Monoton|Pacifico|Pattaya|Rammetto+One" rel="stylesheet">
                    <head>
                        <meta name="viewport" content="width=device-width">
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <title>confirmation email</title>
                        <style>
                        /* -------------------------------------
                            INLINED WITH htmlemail.io/inline
                        ------------------------------------- */
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                        table[class=body] h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important;
                        }
                        table[class=body] p,
                                table[class=body] ul,
                                table[class=body] ol,
                                table[class=body] td,
                                table[class=body] span,
                                table[class=body] a {
                            font-size: 16px !important;
                        }
                        table[class=body] .wrapper,
                                table[class=body] .article {
                            padding: 10px !important;
                        }
                        table[class=body] .content {
                            padding: 0 !important;
                        }
                        table[class=body] .container {
                            padding: 0 !important;
                            width: 100% !important;
                        }
                        table[class=body] .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important;
                        }
                        table[class=body] .btn table {
                            width: 100% !important;
                        }
                        table[class=body] .btn a {
                            width: 100% !important;
                        }
                        table[class=body] .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important;
                        }
                        }
                        /* -------------------------------------
                            PRESERVE THESE STYLES IN THE HEAD
                        ------------------------------------- */
                        @media all {
                        .ExternalClass {
                            width: 100%;
                        }
                        .ExternalClass,
                                .ExternalClass p,
                                .ExternalClass span,
                                .ExternalClass font,
                                .ExternalClass td,
                                .ExternalClass div {
                            line-height: 100%;
                        }
                        .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important;
                        }
                        .btn-primary table td:hover {
                            background-color: #34495e !important;
                        }
                        .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important;
                        }
                        }
                        </style>
                    </head>
                    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                        <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                        <tr>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                                <!-- START CENTERED WHITE CONTAINER -->
                                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Thank you for signing up with us! please confirm your account.</span>
                                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                        <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">

                                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                            <tbody>
                                                <tr>
                                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                    <tbody>
                                                        <tr>
                                                        <td style="font-family: 'Pattaya', sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href=${config.frontEndServer}/resetpassword/${token}/${req.body.email} target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">reset password</a> </td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hope you enjoy our service! please by all mean, contact me with any question or suggestion you have.</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We can't wait to see your work!.</p>
                                        </td>
                                        </tr>
                                    </table>
                                    </td>
                                </tr>

                                <!-- END MAIN CONTENT AREA -->
                                </table>

                                <!-- START FOOTER -->
                                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                    <tr>
                                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">address</span>
                                        <div>
                                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">name</span>
                                        </div>
                                        <br> <a href="#" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;"></a>.
                                    </td>
                                    </tr>
                                    <tr>
                                    <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">

                                    </td>
                                    </tr>
                                </table>
                                </div>
                                <!-- END FOOTER -->

                            <!-- END CENTERED WHITE CONTAINER -->
                            </div>
                            </td>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                        </tr>
                        </table>
                    </body>
                    </html>
           `
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                });
            });
            res.send({msg:'check your email'})
        }
    })
   
});

module.exports = router;
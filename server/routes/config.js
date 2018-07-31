let config = {
	cookieParserSecret: "<SECRET>", // secret for cookie parser
    JWTsecret: "<SECRET>", // secret for JWT 
    nodemailerEmail:"aboyer@coopstrategies.com", // your email client
    nodemailerPw:"0fb9ce7d-922d-4c17-b4df-f4c3a738202c", // your email password client
    smtp:"smtp.elasticemail.com", // i.e 'smtp.domain.com'
    mongoUsername:"aboyer", // if you have your db
    mongoPw:"password1", // if you have your db
    server:"http://127.0.0.1:3010", // your frontend server
    frontEndServer:"http://127.0.0.1:3000" // your front end server
};


module.exports = config
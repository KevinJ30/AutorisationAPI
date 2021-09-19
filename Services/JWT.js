const jwt = require('jsonwebtoken');

const jwt_privateKey = "RMO7wFxZ00a6mfTwNvEXdcfwQJ2CTHAJOm";
process.env.TZ = 'Europe/Paris';
const jwt_exp = (Date.now() / 1000) + 3600;

class JWT {

    static generate(client_id) {
        // Crée un jeton d'accès
        const payload = {
            client_id: client_id,
            exp: jwt_exp,
            typ: "JWT",
            alg: "HS256"
        }

        return jwt.sign(payload, jwt_privateKey, { algorithm: 'HS256' });
    }

}

exports.JWT = JWT;
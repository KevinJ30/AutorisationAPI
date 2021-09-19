const {networkInterfaces} = require('os');

const clientModel = require('../models/index.js').Client;
const {JWT} = require('../Services/JWT.js');
const {Log} = require('../Services/Log.js');

class AuthController {
    /**
     * Retourne un token si le client est autorisé a consommer l'API
     * 
     * @param {Request} request 
     * @param {Response} response 
     * @returns 
     **/
    static token(request, response) {
        const headers = request.headers;

        if(headers.client_id === undefined || headers.client_secret_key === undefined || headers.request_type === undefined) {
            return response.status(401).json({
                status: 401,
                message: "Accès refusé"
            });
        }

        /**
         * Recerche le client dans la base de données
         **/
        const options_request = {
            where: {
                client_id: headers.client_id,
                client_secret_key: headers.client_secret_key,
                activated: true,
                banned: false
            }
        };

        const nets = networkInterfaces();

        clientModel.findOne(options_request).then((data) => {
            if(data) {
                const access_token = JWT.generate(request.headers.client_id);
                
                Log.writeLogAccess({
                    address: nets.Ethernet[0].mac,
                    client_app_id: headers.client_id,
                    request_type: headers.request_type,
                    authorize: true
                }, true);

                return response.status(200).json({
                    status: 200,
                    data: { access_token }
                })
            }

            Log.writeLogAccess({
                address: nets.Ethernet[0].mac,
                client_app_id: headers.client_id,
                request_type: headers.request_type,
                authorize: false
            }, true);

            return response.status(401).json({
                status: 401,
                message: "Vous n'êtes pas authorisé a consommer l'API"
            }); 
        })
    }
}

exports.AuthController = AuthController;
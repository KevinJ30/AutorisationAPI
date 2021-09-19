const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Log {

    /**
     * Ecrit une ligne dans le fichier log des accès au server auth
     * 
     * @param {Object} messageInformations 
     * @param {Boolean} output
     **/
    static writeLogAccess(messageInformations, output = false) {
        const filename =  moment().format('YYYY-MM-DD') + '.txt';
        const file = path.resolve('logs', filename);
        const log = moment().format('YYYY-MM-DD h:m:s') + " : [" + messageInformations.address + ']' + ' | Application ID : ' + messageInformations.client_app_id + ' | Request type : ' + messageInformations.request_type + ' | Autorize : ' + messageInformations.authorize + '\r\n';

        if(output) console.log(log);

        fs.appendFile(file, log, function(err) {
            if(err) throw err;
        })
    }

}

exports.Log = Log;
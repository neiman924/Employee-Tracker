const db = require('./config/connection');

const calc = db.query('SELECT * FROM department', 
    function (err, result) {
        if (err) {
        console.log(err);
        }
        console.log(result)
        return(result);
    });

module.exports = calc;
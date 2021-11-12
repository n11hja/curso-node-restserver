const { validationResult } = require('express-validator');
// Se agrega un tercer campo para la operación de middelware donde se especifica que si pasa las validaciones 
// continue con los siguientes, se coloca la palabra una coma (,) y next
const validarCampos = ( req, res, next) => {

    const errors = validationResult(req);
    //isEmpty regresa true si esta vacia, para regresar lista de errores se coloca el admiración invertido !
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next(); 

}


module.exports = {
    validarCampos
}
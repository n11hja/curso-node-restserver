const { Router } = require('express');
const { check } = require('express-validator'); //Validar campos
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators'); // se creo para poder facilitar la validación de rol valido
const { validarCampos } = require('../middlewares/validar-campos'); // se creo para mostrar todos los errores

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch 
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);     

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( (rol) => esRoleValido (rol) ), 
    validarCampos
],usuariosPut);    



// not() es una negación de la función siguiente
router.post('/', [
    check('nombre', 'El nombre es oligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6}),
    
    check('correo').custom( (correo) => emailExiste (correo) ) ,
    //check('correo', 'El correo no es valido').isEmail(),
    // Dato duro
    //check('rol', 'No es un rol valido permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // Se puede acotar a solo la referecia esRoleValido
    check('rol').custom( (rol) => esRoleValido (rol) ), 
    validarCampos
],usuariosPost);    

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
]
,usuariosDelete);    

router.patch('/',  usuariosPatch);    

module.exports = router;
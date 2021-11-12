const Role = require('../models/role');
const Usuario = require('../models/usuario');
// --const { check } = require('express-validator'); //Validar campos

const esRoleValido = async ( rol = '') => {

  const existeRol = await Role.findOne( { rol } );
  if( !existeRol ){
  throw new Error( `El rol ${ rol } no está registrado en la BD` ) 
  }

}

const emailExiste = async( correo = '') => {
 
   //verificar si el correo existe
  const existeEmail = await Usuario.findOne( { correo } );
  if( existeEmail ){
   throw new Error( `El correo ${ correo } ya esta registrado `);
  }
//  -- else if ( cheexisteEmail.isEmail() ){
//  --   throw new Error(` El correo ${ correo } no es valido `);
//  -- }
  
}

const existeUsuarioPorId = async( id ) => {
 
    //verificar si el correo existe
   const existeUsuario = await Usuario.findById( id );
   if( !existeUsuario ){
    throw new Error( `El usuario no existe ${ id }  `);
   }
 }

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async ( req = request, res = response ) => { 

    //const { q, nombre = 'No name', apikey, page, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find()        
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) ) ;
    // const total = await Usuario.count(query);

    const [ total, usuarios ] = await Promise.all( [
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ]);

    
    res.json ({
        usuarios,
        total
    });

}  

const usuariosPost = async( req, res = response ) => { 

    const { nombre, correo, password, rol } = req.body; 
    const usuario = new Usuario( { nombre, correo, password, rol }  );


    //verificar si el correo existe
    // const existeEmail = await Usuario.findOne( { correo } );
    // if( existeEmail ){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     });
    // }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar contraseña
    await usuario.save();

    res.json({        
        usuario
    });

}

const usuariosPut = async ( req, res = response ) => { 
    
    const { id } = req.params; 
    const { password, google, correo,...resto} = req.body;

    if( password ){
        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id , resto, {new: true} );
     res.json ({
        msg: 'Put API - usuarios Put',
        usuario
    });

}

const usuariosPatch = ( req, res = response ) => { 

    res.json ({
        msg: 'Patch API - Controlador Patch'
    });
}

const usuariosDelete = async( req, res = response ) => { 

    const { id } = req.params;

    //const usuario =await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id , { estado: false });

    res.json ({  usuario  });
    
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
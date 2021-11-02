const { response, request } = require('express');

const usuariosGet = ( req = request, res = response ) => { 

    const { q, nombre = 'No name', apikey, page, limit} = req.query;

    res.json ({
        msg: 'get API - Controlador Get',
        q,
        nombre,
        apikey,
        page,
        limit
    });

}

const usuariosPost = ( req, res = response ) => { 

    const body = req.body;

    res.json ({
        msg: 'Post API - Controlador Post',
        body
    });

}

const usuariosPut = ( req, res = response ) => { 

    res.json ({
        msg: 'Put API - Controlador Put'
    });

}

const usuariosPatch = ( req, res = response ) => { 

    res.json ({
        msg: 'Patch API - Controlador Patch'
    });
}

const usuariosDelete = ( req, res = response ) => { 

        res.json ({
            msg: 'Delete API - Controlador Delete'
        });
    
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
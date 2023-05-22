'use strict';
const utils = require('../helpers/util');

exports.getHome = async (req, res, next) => {
    try { 
        
        var data = {
            welcome: 'Olá você está na raiz dessa coleção de endpoints',
            notToDoHere: 'Não tem nada para fazer aqui'
        };

        res.json(data);

    } catch (error) {
        console.error(utils.endpointError(error));

        // Informa ao express que ocorreu e um erro
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
    }
}

exports.getHomePage = async (req, res, next) => {
    try { // renderiza a pagina 'html' index.ejs

        res.render('index', {title: 'Express'});

    } catch (error) {
        console.error(utils.endpointError(error));

        // Informa ao express que ocorreu e um erro
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
    }
}

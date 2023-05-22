'use strict';

const express = require('express');
const axios = require('axios')
const utils = require('../helpers/util');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

exports.getFileJSON = async (req, res, next) => {

  try {

    //todo

  } catch (error) {
        console.error(utils.endpointError(error));
        // Informa ao express que ocorreu e um erro 
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
      }
  };

exports.postFileJSON = async (req, res, next) => {

  try {

    // Obtém o JSON enviado pelo front-end
    const arquivoJSON = req.body; 
    
    // Obtém o conteúdo base64 do JSON
    const conteudoBase64 = arquivoJSON.base64; 

    // Decodifica o conteúdo base64 para uma string
    const conteudoString = Buffer.from(conteudoBase64, 'base64').toString('utf-8');

    // Aqui você pode manipular a string como desejar
    console.log(conteudoString);

    res.sendStatus(200);

    } catch (error) {
        console.error(utils.endpointError(error));
        // Informa ao express que ocorreu e um erro 
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
      }
  };


  exports.getPostFilePage = async (req, res, next) => {
    try { // renderiza a pagina 'html' index.ejs

        res.render('jsonfileupload', {title: 'Express'});

    } catch (error) {
        console.error(utils.endpointError(error));

        // Informa ao express que ocorreu e um erro
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
    }
}

















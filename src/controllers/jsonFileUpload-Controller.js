'use strict';

const express = require('express');
const utils = require('../helpers/util');
const processaConteudo = require('../business/processamento');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mime = require('mime');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

exports.getFileJSON = async (req, res, next) => {

    try { // todo

    } catch (error) {
        console.error(utils.endpointError(error));
        // Informa ao express que ocorreu e um erro
        // e que o middleware  de tratamento de erro deve ser chamado
        next(error);
    }
};

exports.postFileJSON = async (req, res, next) => {
    try { // Obtém o JSON enviado pelo front-end
        const arquivoJSON = req.body;
        const nomeArquivo = arquivoJSON.nome;
        const conteudoBase64 = arquivoJSON.base64;

        // Decodifica o conteúdo base64 para uma string
        const conteudoString = Buffer.from(conteudoBase64, 'base64').toString('utf-8');

        // Aqui você pode manipular a string como desejar
        const conteudoManipulado = processaConteudo(conteudoString);

        // Cria o caminho do arquivo temporário
        const filePath = path.resolve(__dirname, '..', '..', 'public', 'temp', `${nomeArquivo}.txt`);

        // Grava o conteúdo manipulado no arquivo
        fs.writeFileSync(filePath, conteudoManipulado, 'utf-8');

        // Configura os cabeçalhos da resposta HTTP para forçar o download do arquivo
        
        var mimetype = mime.getType(filePath);

        res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}.txt`);
        //res.setHeader('Content-Type', 'application/octet-stream;charset=utf-8');
        res.setHeader('Content-Length', fs.statSync(filePath).size);
        res.setHeader('Content-type', mimetype);

        // Envia o arquivo como resposta
        res.download(filePath, function (err) {
            if (err) {
                console.log("error");
                console.log(err);
            } else {
                console.log("Sucess");
            }

        });


    } catch (error) {
        console.error(utils.endpointError(error));
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

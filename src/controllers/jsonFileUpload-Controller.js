'use strict';

const express = require('express');
const utils = require('../helpers/util');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const mime = require('mime');
const processaConteudo = require('../business/processamento');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

exports.getPostFilePage = async (req, res, next) => {
    try { // renderiza a pagina 'html' index.ejs

        res.render('jsonfileupload', {title: 'Express'});

    } catch (error) {
        console.error(utils.endpointError(error));
        next(error);
    }
}

exports.postFileJSON = async (req, res, next) => {
    
    //# Obtém o JSON enviado pelo front-end
    
    try { 

        const arquivoJSON = req.body;
        const nomeArquivo = arquivoJSON.nome;
        const conteudoBase64 = arquivoJSON.base64;

        // Decodifica o conteúdo base64 para uma string
        const conteudoString = Buffer.from(conteudoBase64, 'base64').toString('utf-8');

        //? Aqui você pode manipular a string como desejar
        const conteudoManipulado = processaConteudo(conteudoString);

        // Cria o caminho do arquivo temporário
        const filePath = path.resolve(__dirname, '..', '..', 'public', 'temp', `${nomeArquivo}`);

        // Grava o conteúdo manipulado no arquivo
        fs.writeFileSync(filePath, conteudoManipulado, 'utf-8');

        // Configura os cabeçalhos da resposta HTTP para forçar o download do arquivo
        
        var mimetype = mime.getType(filePath);

        res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);
        res.setHeader('Content-Length', fs.statSync(filePath).size);
      //res.setHeader('Content-Type', 'application/octet-stream;charset=utf-8');
        res.setHeader('Content-type', mimetype);

        // Envia o arquivo como resposta
        res.download(filePath, function (err) {
            if (err) {
                console.error(utils.endpointError(err));
            } else {
                console.log(`${filePath} Original gerado com sucesso`  )
            }
        });
        
        //Remove o arquivo de temp
        //fs.unlink(filePath);

    } catch (error) {
        console.error(utils.endpointError(error));
        next(error);
    }
};

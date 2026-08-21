//IMPORTAR BIBLIOTECA
import express from 'express';

//MPORTAR VARIAVEIS DE AMBIENTE
import dotenv from 'dotenv';

//CARREGANDO AS VARIAVEIS DO .env
dotenv.config();

//CRIAR APLICACAO EXPRESS
const app = express();

//INCLUIR CONTROLLERS
import login from"./controllers/login";

//CRIAR ROTA
app.use('/', login);

//INICIAR O SERVIDOR NA PORTA 8080
app.listen(process.env.PORT, () => {
    console.log(`servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
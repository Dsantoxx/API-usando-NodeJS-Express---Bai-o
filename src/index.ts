//IMPORTAR BIBLIOTECA
import express from 'express';

//MPORTAR VARIAVEIS DE AMBIENTE
import dotenv from 'dotenv';

//CARREGANDO AS VARIAVEIS DO .env
dotenv.config();

//CRIAR APLICACAO EXPRESS
const app = express();

//CRIAR UM MIDDLEWARE PARA RECEBER OS DADOS NO CORPO DA REQUISICAO
app.use(express.json());

//INCLUIR CONTROLLERS
import AuthController from"./controllers/AuthController";
import SituationsController from"./controllers/SituationsController";

//CRIAR ROTA
app.use('/', AuthController);
app.use("/", SituationsController);

//INICIAR O SERVIDOR NA PORTA 8080
app.listen(process.env.PORT, () => {
    console.log(`servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
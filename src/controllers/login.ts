//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';

//IMPORTAR O ARQUIVO COM AS CREDENCIAIS DO BANCO DE DADOS
import { AppDataSource } from '../data-source';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//INICIALIZAR A CONEXAO COM O BANCO DE DADOS

AppDataSource.initialize().then(()=>(
    console.log("Conexão do banco de dados realizada com sucesso!")
)).catch((error)=>(
    console.log("Erro na conexão do banco de dados falhou!",error)
))

//CRIAR ROTA GET PRINCIPAL
router.get('/', (req: Request, res: Response) => {
    res.send("Bem-vindo Pessoal");
});

//EXPORTAR A INSTRUÇÃO DA ROTA

export default router;
//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR ROTA GET PRINCIPAL
router.get('/', (req: Request, res: Response) => {
    res.send("Bem-vindo Pessoal");
});

//EXPORTAR A INSTRUÇÃO DA ROTA

export default router;
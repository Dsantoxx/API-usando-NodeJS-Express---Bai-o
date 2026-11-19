//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR ROTA GET PRINCIPAL
router.get("/test-connection", (req: Request, res: Response) => {
    res.status(200).json({ message: "Conexão com API realizada com successo!" });
});


export default router;
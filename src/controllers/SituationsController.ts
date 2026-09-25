//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { Situation } from '../entity/Situations';
import { AppDataSource } from '../data-source';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR ROTA GET PRINCIPAL
router.get("/situations", (req: Request, res: Response) => {
    res.send("Bem-vindo Pessoal");
});

//CRIAR ROTA POST
router.post("/situations", async (req: Request, res: Response) => {

    try{
        var data = req.body;

        const SituationRepository = AppDataSource.getRepository(Situation);

        const newSituation = SituationRepository.create(data);

        await SituationRepository.save(newSituation);

        res.status(200).json({
            messagem : "Situação cadastrada com sucesso",
            situation : newSituation,
        })
    } catch (error) {
    console.error("Erro ao cadastrar situação:", error);

    res.status(500).json({
        mensagem: "Erro ao cadastrar situação"
    });
}

});

//EXPORTAR A INSTRUÇÃO DA ROTA

export default router;
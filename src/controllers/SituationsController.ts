//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { Situation } from '../entity/Situations';
import { AppDataSource } from '../data-source';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR A LISTA
router.get("/situations", async (req: Request, res: Response) => {
    try {
        const SituationRepository = AppDataSource.getRepository(Situation);

        const situations = await SituationRepository.find();

        res.status(200).json(situations);
        return

    } catch (error) {
        console.error("Erro ao listar situações:", error);
        res.status(500).json({
            mensagem: "Erro ao listar situações"
        });
        return
    }
});

// VISUALIZAÇÃO DO ITEM CADASTRADO EM SITUAÇÃO
router.get("/situations/:id", async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const SituationRepository = AppDataSource.getRepository(Situation);

        const situation = await SituationRepository.findOneBy({
            id: id
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação não encontrada!"
            });
            return;
        }

        res.status(200).json(situation);
        return;

    } catch (error) {

        console.error("Erro ao buscar situação:", error);

        res.status(500).json({
            mensagem: "Erro ao visualizar situação"
        });
        return;
    }
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

// VISUALIZAÇÃO DO ITEM CADASTRADO EM SITUAÇÃO
router.put("/situations/:id", async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        var data = req.body;

        const SituationRepository = AppDataSource.getRepository(Situation);

        const situation = await SituationRepository.findOneBy({
            id: id
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação não encontrada!"
            });
            return;
        }

        //ATUALIZA OS DADOS
        SituationRepository.merge(situation, data);

        //SALVAR AS ALTERAÇÕES DE DADOS
        const updatedSituation = await SituationRepository.save(situation);

        res.status(200).json({
            messagem : "Situação atualizada com sucesso",
            situation : updatedSituation,
        })

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao editar situação"
        });
        return;
    }
});

//EXPORTAR A INSTRUÇÃO DA ROTA

export default router;
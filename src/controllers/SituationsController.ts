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

        // Número de itens por página
        const limite = 1;

        // Página solicitada
        const page = Number(req.query.page) || 1;

        // Contar registros
        const totalSituations = await SituationRepository.count();

        if (totalSituations === 0) {
            res.status(200).json({
                mensagem: "Nenhuma situação encontrada!"
            });
            return;
        }

        // Calcular última página
        const lastPage = Math.ceil(totalSituations / limite);

        // Validar página
        if (page < 1 || !Number.isInteger(page) || page > lastPage) {
            res.status(400).json({
                mensagem: `Página inválida. O total de páginas é ${lastPage}`
            });
            return;
        }

        // Calcular offset
        const offset = (page - 1) * limite;

        // Buscar registros com paginação
        const situations = await SituationRepository.find({
            skip: offset,
            take: limite,
            order: { id: "DESC" }
        });

        res.status(200).json({
            currentPage: page,
            lastPage,
            totalSituations,
            situations
        });

    } catch (error) {
        console.error("Erro ao listar situações:", error);

        res.status(500).json({
            mensagem: "Erro ao listar situações"
        });
        return;
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

// CADASTRA ITENS NO BANCO DE DADOS
router.post("/situations", async (req: Request, res: Response) => {

    try{
        var data = req.body;

        const SituationRepository = AppDataSource.getRepository(Situation);

        const newSituation = SituationRepository.create(data);

        await SituationRepository.save(newSituation);

        res.status(200).json({
            mensagem : "Situação cadastrada com sucesso",
            situation : newSituation,
        })
    } catch (error) {
    console.error("Erro ao cadastrar situação:", error);

    res.status(500).json({
        mensagem: "Erro ao cadastrar situação"
    });
}

});

// FAZ A ATUALIZAÇÃO DO ITEM CADASTRADO EM SITUAÇÃO
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

// REMOVE O ITEM CADASTRADO NO BANCO DE DADOS
router.delete("/situations/:id", async (req: Request, res: Response) => {

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

        //REMOVER OS DADOS NO BACNO DE DADOS
        await SituationRepository.remove(situation);

        res.status(200).json({
            messagem : "Situação removida com sucesso",
        })

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao remover situação"
        });
        return;
    }
});

//EXPORTAR A INSTRUÇÃO DA ROTA

export default router;
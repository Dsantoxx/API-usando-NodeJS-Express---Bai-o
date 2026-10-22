//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { ProductSituation } from '../entity/ProductsSituations';
import { AppDataSource } from '../data-source';
import { PaginationService } from '../services/paginationService';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR A LISTA
router.get("/products-situations", async (req: Request, res: Response) => {
    try {
        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const limite = Number(req.query.limite) || 10;
        const page = Number(req.query.page) || 1;

        const result = await PaginationService.paginate(
            SituationRepository, page, limite, { id: "DESC" }
        );

        res.status(200).json(result);
        return;

    } catch (error) {
        console.error("Erro ao listar situações dos produtos:", error);

        res.status(500).json({
            mensagem: "Erro ao listar situações dos produtos"
        });
        return;
    }
});

// VISUALIZAÇÃO DA SITUAÇÃO CADASTRADA
router.get("/products-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const situation = await SituationRepository.findOneBy({
            id: id
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação do produto não encontrada!"
            });
            return;
        }

        res.status(200).json(situation);
        return;

    } catch (error) {
        console.error("Erro ao buscar situação do produto:", error);

        res.status(500).json({
            mensagem: "Erro ao visualizar situação do produto"
        });
        return;
    }
});

// CADASTRA SITUAÇÕES DOS PRODUTOS NO BANCO DE DADOS
router.post("/products-situations", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const newSituation = SituationRepository.create(data);

        await SituationRepository.save(newSituation);

        res.status(200).json({
            mensagem: "Situação do produto cadastrada com sucesso",
            situation: newSituation
        });
        return;

    } catch (error) {
        console.error("Erro ao cadastrar situação do produto:", error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar situação do produto"
        });
        return;
    }
});

// FAZ A ATUALIZAÇÃO DA SITUAÇÃO CADASTRADA
router.put("/products-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        var data = req.body;

        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const situation = await SituationRepository.findOneBy({
            id: id
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação do produto não encontrada!"
            });
            return;
        }

        //ATUALIZA OS DADOS
        SituationRepository.merge(situation, data);

        //SALVAR AS ALTERAÇÕES
        const updatedSituation = await SituationRepository.save(situation);

        res.status(200).json({
            mensagem: "Situação do produto atualizada com sucesso",
            situation: updatedSituation
        });
        return;

    } catch (error) {
        console.error("Erro ao editar situação do produto:", error);

        res.status(500).json({
            mensagem: "Erro ao editar situação do produto"
        });
        return;
    }
});

// REMOVE A SITUAÇÃO CADASTRADA
router.delete("/products-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const situation = await SituationRepository.findOneBy({
            id: id
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação do produto não encontrada!"
            });
            return;
        }

        //REMOVER OS DADOS
        await SituationRepository.remove(situation);

        res.status(200).json({
            mensagem: "Situação do produto removida com sucesso"
        });
        return;

    } catch (error) {
        console.error("Erro ao remover situação do produto:", error);

        res.status(500).json({
            mensagem: "Erro ao remover situação do produto"
        });
        return;
    }
});

//EXPORTAR A INSTRUÇÃO DA ROTA
export default router;
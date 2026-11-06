//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { Situation } from '../entity/Situations';
import { AppDataSource } from '../data-source';
import { PaginationService } from '../services/paginationService';
import * as yup from 'yup';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR A LISTA

router.get("/situations", async (req: Request, res: Response) => {
    try {
        const SituationRepository = AppDataSource.getRepository(Situation);

        // Número de itens por página
        const limite = Number(req.query.limite) || 10;

        // Página solicitada
        const page = Number(req.query.page) || 1;

        const result = await PaginationService.paginate(SituationRepository, page, limite, {id: "DESC"});

        res.status(200).json(result);
        return;

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

    try {
        const data = req.body;

        console.log("POST SITUATIONS EXECUTADO");
        console.log("Dados recebidos:", data);

        // VALIDAÇÃO COM YUP
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .trim()
                .required("O campo nome é obrigatório")
                .min(3, "O campo nome deve ter no mínimo 3 caracteres")
        });

        // VALIDAR ANTES DE SALVAR
        const validatedData = await schema.validate(data, {
            abortEarly: false
        });

        console.log("VALIDAÇÃO APROVADA");

        const SituationRepository = AppDataSource.getRepository(Situation);

        const newSituation = SituationRepository.create(validatedData);

        await SituationRepository.save(newSituation);

        res.status(200).json({
            mensagem: "Situação cadastrada com sucesso",
            situation: newSituation
        });
        return;

    } catch (error) {

        if (error instanceof yup.ValidationError) {

            console.log("ERRO DE VALIDAÇÃO:", error.errors);

            res.status(400).json({
                mensagem: error.errors
            });
            return;
        }

        console.error("Erro ao cadastrar situação:", error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar situação"
        });
        return;
    }
});



 // FAZ A ATUALIZAÇÃO DO ITEM CADASTRADO EM SITUAÇÃO
router.put("/situations/:id", async (req: Request, res: Response) => {

    console.log("TESTE PUT COM YUP");
    console.log("DADOS RECEBIDOS:", req.body);

    try {

        const id = Number(req.params.id);

        var data = req.body;

        // VALIDAR O ID
        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                mensagem: "ID da situação inválido"
            });
            return;
        }

        // CRIAR VALIDAÇÃO COM YUP
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .trim()
                .required("O campo nome é obrigatório")
                .min(3, "O campo nome deve ter no mínimo 3 caracteres")
        });

        // VALIDAR OS DADOS RECEBIDOS
        data = await schema.validate(data, {
            abortEarly: false
        });

        console.log("VALIDAÇÃO YUP REALIZADA COM SUCESSO!");

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

        // ATUALIZA OS DADOS
        SituationRepository.merge(situation, data);

        // SALVAR AS ALTERAÇÕES
        const updatedSituation = await SituationRepository.save(situation);

        console.log("SITUAÇÃO ATUALIZADA COM SUCESSO!");

        res.status(200).json({
            mensagem: "Situação atualizada com sucesso",
            situation: updatedSituation
        });
        return;

    } catch (error) {

        // ERRO DE VALIDAÇÃO DO YUP
        if (error instanceof yup.ValidationError) {

            console.log("ERRO DE VALIDAÇÃO:", error.errors);

            res.status(400).json({
                mensagem: error.errors
            });
            return;
        }

        console.error("Erro ao editar situação:", error);

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
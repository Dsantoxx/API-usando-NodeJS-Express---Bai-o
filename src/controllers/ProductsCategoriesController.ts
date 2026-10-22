//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { ProductCategory } from '../entity/ProductsCategories';
import { AppDataSource } from '../data-source';
import { PaginationService } from '../services/paginationService';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR A LISTA
router.get("/products-categories", async (req: Request, res: Response) => {
    try {
        const CategoryRepository = AppDataSource.getRepository(ProductCategory);

        const limite = Number(req.query.limite) || 10;
        const page = Number(req.query.page) || 1;

        const result = await PaginationService.paginate(
            CategoryRepository, page, limite, { id: "DESC" }
        );

        res.status(200).json(result);
        return;

    } catch (error) {
        console.error("Erro ao listar categorias:", error);

        res.status(500).json({
            mensagem: "Erro ao listar categorias"
        });
        return;
    }
});

// VISUALIZAÇÃO DA CATEGORIA CADASTRADA
router.get("/products-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const CategoryRepository = AppDataSource.getRepository(ProductCategory);

        const category = await CategoryRepository.findOneBy({
            id: id
        });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!"
            });
            return;
        }

        res.status(200).json(category);
        return;

    } catch (error) {
        console.error("Erro ao buscar categoria:", error);

        res.status(500).json({
            mensagem: "Erro ao visualizar categoria"
        });
        return;
    }
});

// CADASTRA CATEGORIAS NO BANCO DE DADOS
router.post("/products-categories", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const CategoryRepository = AppDataSource.getRepository(ProductCategory);

        const newCategory = CategoryRepository.create(data);

        await CategoryRepository.save(newCategory);

        res.status(200).json({
            mensagem: "Categoria cadastrada com sucesso",
            category: newCategory
        });
        return;

    } catch (error) {
        console.error("Erro ao cadastrar categoria:", error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar categoria"
        });
        return;
    }
});

// FAZ A ATUALIZAÇÃO DA CATEGORIA CADASTRADA
router.put("/products-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        var data = req.body;

        const CategoryRepository = AppDataSource.getRepository(ProductCategory);

        const category = await CategoryRepository.findOneBy({
            id: id
        });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!"
            });
            return;
        }

        //ATUALIZA OS DADOS
        CategoryRepository.merge(category, data);

        //SALVAR AS ALTERAÇÕES
        const updatedCategory = await CategoryRepository.save(category);

        res.status(200).json({
            mensagem: "Categoria atualizada com sucesso",
            category: updatedCategory
        });
        return;

    } catch (error) {
        console.error("Erro ao editar categoria:", error);

        res.status(500).json({
            mensagem: "Erro ao editar categoria"
        });
        return;
    }
});

// REMOVE A CATEGORIA CADASTRADA
router.delete("/products-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const CategoryRepository = AppDataSource.getRepository(ProductCategory);

        const category = await CategoryRepository.findOneBy({
            id: id
        });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!"
            });
            return;
        }

        //REMOVER OS DADOS
        await CategoryRepository.remove(category);

        res.status(200).json({
            mensagem: "Categoria removida com sucesso"
        });
        return;

    } catch (error) {
        console.error("Erro ao remover categoria:", error);

        res.status(500).json({
            mensagem: "Erro ao remover categoria"
        });
        return;
    }
});

//EXPORTAR A INSTRUÇÃO DA ROTA
export default router;
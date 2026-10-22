//IMPORTAR BIBLIOTECA
import express, { Request, Response } from 'express';
import { Product } from '../entity/Products';
import { ProductCategory } from '../entity/ProductsCategories';
import { ProductSituation } from '../entity/ProductsSituations';
import { AppDataSource } from '../data-source';
import { PaginationService } from '../services/paginationService';

//CRIAR APLICACAO EXPRESS
const router = express.Router();

//CRIAR A LISTA
router.get("/products", async (req: Request, res: Response) => {
    try {
        const ProductRepository = AppDataSource.getRepository(Product);

        const limite = Number(req.query.limite) || 10;
        const page = Number(req.query.page) || 1;

        const result = await PaginationService.paginate(
            ProductRepository, page, limite, { id: "DESC" }
        );

        res.status(200).json(result);
        return;

    } catch (error) {
        console.error("Erro ao listar produtos:", error);

        res.status(500).json({
            mensagem: "Erro ao listar produtos"
        });
        return;
    }
});

// VISUALIZAÇÃO DO PRODUTO CADASTRADO
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const ProductRepository = AppDataSource.getRepository(Product);

        const product = await ProductRepository.findOne({
        where: { id: id },
        relations: {
            productCategory: true,
            productSituation: true
        }
    });;

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
            return;
        }

        res.status(200).json(product);
        return;

    } catch (error) {
        console.error("Erro ao buscar produto:", error);

        res.status(500).json({
            mensagem: "Erro ao visualizar produto"
        });
        return;
    }
});

// CADASTRA PRODUTOS NO BANCO DE DADOS
router.post("/products", async (req: Request, res: Response) => {
    try {
        const { name, productCategoryId, productSituationId } = req.body;

        const ProductRepository = AppDataSource.getRepository(Product);
        const CategoryRepository = AppDataSource.getRepository(ProductCategory);
        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        if (!name || !productCategoryId || !productSituationId) {
            res.status(400).json({
                mensagem: "Informe nome, categoria e situação do produto"
            });
            return;
        }

        const category = await CategoryRepository.findOneBy({
            id: Number(productCategoryId)
        });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!"
            });
            return;
        }

        const situation = await SituationRepository.findOneBy({
            id: Number(productSituationId)
        });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação do produto não encontrada!"
            });
            return;
        }

        const newProduct = ProductRepository.create({
            name: name,
            productCategory: category,
            productSituation: situation
        });

        await ProductRepository.save(newProduct);

        res.status(200).json({
            mensagem: "Produto cadastrado com sucesso",
            product: newProduct
        });
        return;

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar produto"
        });
        return;
    }
});

// FAZ A ATUALIZAÇÃO DO PRODUTO CADASTRADO
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, productCategoryId, productSituationId } = req.body;

        const ProductRepository = AppDataSource.getRepository(Product);
        const CategoryRepository = AppDataSource.getRepository(ProductCategory);
        const SituationRepository = AppDataSource.getRepository(ProductSituation);

        const product = await ProductRepository.findOneBy({
            id: id
        });

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
            return;
        }

        //ATUALIZA OS DADOS
        if (name !== undefined) {
            product.name = name;
        }

        if (productCategoryId !== undefined) {
            const category = await CategoryRepository.findOneBy({
                id: Number(productCategoryId)
            });

            if (!category) {
                res.status(404).json({
                    mensagem: "Categoria não encontrada!"
                });
                return;
            }

            product.productCategory = category;
        }

        if (productSituationId !== undefined) {
            const situation = await SituationRepository.findOneBy({
                id: Number(productSituationId)
            });

            if (!situation) {
                res.status(404).json({
                    mensagem: "Situação do produto não encontrada!"
                });
                return;
            }

            product.productSituation = situation;
        }

        //SALVAR AS ALTERAÇÕES
        const updatedProduct = await ProductRepository.save(product);

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso",
            product: updatedProduct
        });
        return;

    } catch (error) {
        console.error("Erro ao editar produto:", error);

        res.status(500).json({
            mensagem: "Erro ao editar produto"
        });
        return;
    }
});

// REMOVE O PRODUTO CADASTRADO
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const ProductRepository = AppDataSource.getRepository(Product);

        const product = await ProductRepository.findOneBy({
            id: id
        });

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
            return;
        }

        //REMOVER OS DADOS
        await ProductRepository.remove(product);

        res.status(200).json({
            mensagem: "Produto removido com sucesso"
        });
        return;

    } catch (error) {
        console.error("Erro ao remover produto:", error);

        res.status(500).json({
            mensagem: "Erro ao remover produto"
        });
        return;
    }
});

//EXPORTAR A INSTRUÇÃO DA ROTA
export default router;
import { DataSource } from "typeorm"
import { Product } from "../entity/Products"
import { ProductCategory } from "../entity/ProductsCategories"
import { ProductSituation } from "../entity/ProductsSituations"

export default class CreateProductsSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed de products...")

        const productRepository = dataSource.getRepository(Product);
        const categoryRepository = dataSource.getRepository(ProductCategory);
        const situationRepository = dataSource.getRepository(ProductSituation);

        const existingProducts = await productRepository.count();

        if (existingProducts > 0) {
            console.log("A tabela 'products' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const eletronicos = await categoryRepository.findOneBy({
            name: "Eletrônicos"
        });

        const informatica = await categoryRepository.findOneBy({
            name: "Informática"
        });

        const acessorios = await categoryRepository.findOneBy({
            name: "Acessórios"
        });

        const perifericos = await categoryRepository.findOneBy({
            name: "Periféricos"
        });

        const celulares = await categoryRepository.findOneBy({
            name: "Celulares"
        });

        const ativo = await situationRepository.findOneBy({
            name: "Ativo"
        });

        const inativo = await situationRepository.findOneBy({
            name: "Inativo"
        });

        const pendente = await situationRepository.findOneBy({
            name: "Pendente"
        });

        if (
            !eletronicos ||
            !informatica ||
            !acessorios ||
            !perifericos ||
            !celulares ||
            !ativo ||
            !inativo ||
            !pendente
        ) {
            console.log("Categorias ou situações não encontradas. Execute os outros seeds primeiro!");
            return;
        }

        const products = [
            {
                name: "Smart TV Samsung",
                productCategory: eletronicos,
                productSituation: ativo
            },
            {
                name: "Notebook Dell",
                productCategory: informatica,
                productSituation: ativo
            },
            {
                name: "Carregador USB-C",
                productCategory: acessorios,
                productSituation: pendente
            },
            {
                name: "Mouse Gamer",
                productCategory: perifericos,
                productSituation: ativo
            },
            {
                name: "iPhone 15",
                productCategory: celulares,
                productSituation: inativo
            }
        ]

        await productRepository.save(products);

        console.log("Seed concluído com sucesso: produtos cadastrados!")
    }

}
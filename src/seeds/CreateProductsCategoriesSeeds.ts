import { DataSource } from "typeorm"
import { ProductCategory } from "../entity/ProductsCategories"

export default class CreateProductsCategoriesSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed de product_categories...")

        const categoryRepository = dataSource.getRepository(ProductCategory);

        const existingCategories = await categoryRepository.count();

        if (existingCategories > 0) {
            console.log("A tabela 'product_categories' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const categories = [
            { name: "Eletrônicos" },
            { name: "Informática" },
            { name: "Acessórios" },
            { name: "Periféricos" },
            { name: "Celulares" },
        ]

        await categoryRepository.save(categories);

        console.log("Seed concluído com sucesso: categorias cadastradas!")
    }

}
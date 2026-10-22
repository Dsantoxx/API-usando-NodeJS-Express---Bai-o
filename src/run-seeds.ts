import { AppDataSource } from "./data-source"
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";
import CreateProductsCategoriesSeeds from "./seeds/CreateProductsCategoriesSeeds";
import CreateProductsSituationsSeeds from "./seeds/CreateProductsSituationsSeeds";
import CreateProductsSeeds from "./seeds/CreateProductsSeeds";


const runSeeds = async() => {
    console.log("Conectando ao banco de dados...")

    await AppDataSource.initialize();

    console.log("Banco de dados conectado!")

    try {
        //cria a instancia das classes de seed
        const situationsSeeds = new CreateSituationsSeeds();
        const productsCategoriesSeeds = new CreateProductsCategoriesSeeds();
        const productsSituationsSeeds = new CreateProductsSituationsSeeds();
        const productsSeeds = new CreateProductsSeeds();

        //executa as Seeds
        await situationsSeeds.run(AppDataSource);

        await productsCategoriesSeeds.run(AppDataSource);

        await productsSituationsSeeds.run(AppDataSource);

        await productsSeeds.run(AppDataSource);

        console.log("Todos os seeds foram executados com sucesso!");

    } catch(error) {

        console.error("Erro ao executar os seeds:", error);

    } finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada!");

    }
}

runSeeds();
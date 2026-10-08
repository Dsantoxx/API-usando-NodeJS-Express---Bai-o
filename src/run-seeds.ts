import { AppDataSource} from "./data-source"
import CreateSituationsSeeds  from "./seeds/CreateSituationsSeeds";

const runSeeds = async() =>{
    console.log("Conectando ao banco de dados...")

    await AppDataSource.initialize();

    console.log("Banco de dados conectado!")

    try{
        //cria a instancia da classes de seed
        const situationsSeeds = new CreateSituationsSeeds();

        //executa as Seeds
        await situationsSeeds.run(AppDataSource);

    }catch(error){

        console.error("Erro ao executar o seed:", error);

    }finally{

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada!");

    }
}

runSeeds();
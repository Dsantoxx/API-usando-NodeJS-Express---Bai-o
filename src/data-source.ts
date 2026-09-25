import "reflect-metadata"
import {DataSource} from "typeorm";
import { Situation } from "./entity/Situations";
import { User } from "./entity/User";

//MPORTAR VARIAVEIS DE AMBIENTE
import dotenv from 'dotenv';

//CARREGANDO AS VARIAVEIS DO .env
dotenv.config();

    const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Situation, User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.{js,ts}"],
});

//INICIALIZAR A CONEXAO COM O BANCO DE DADOS

AppDataSource.initialize().then(()=>(
    console.log("Conexão do banco de dados realizada com sucesso!")
)).catch((error)=>(
    console.log("Erro na conexão do banco de dados falhou!",error)
))

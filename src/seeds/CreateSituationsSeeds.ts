import { DataSource} from "typeorm"
import { Situation } from "../entity/Situations"

export default class CreateSituationsSeeds {

    public async run(dataSource: DataSource): Promise<void>{
        console.log("Iniciando o seed de situations...")

        const situationRepository = dataSource.getRepository(Situation);

        const existingSituations = await situationRepository.count();

        if(existingSituations > 0){
            console.log("A tabela 'situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const situations = [
            {nameSituation: "Ativo"},
            {nameSituation: "Inativo"},
            {nameSituation: "Pendente"},
        ]


        await situationRepository.save(situations);

        console.log("Seed concluido com sucesso: situações cadastradas!")
    }

}
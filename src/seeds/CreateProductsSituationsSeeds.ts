import { DataSource } from "typeorm"
import { ProductSituation } from "../entity/ProductsSituations"

export default class CreateProductsSituationsSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed de product_situations...")

        const situationRepository = dataSource.getRepository(ProductSituation);

        const existingSituations = await situationRepository.count();

        if (existingSituations > 0) {
            console.log("A tabela 'product_situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const situations = [
            { name: "Ativo" },
            { name: "Inativo" },
            { name: "Pendente" },
        ]

        await situationRepository.save(situations);

        console.log("Seed concluído com sucesso: situações dos produtos cadastradas!")
    }

}
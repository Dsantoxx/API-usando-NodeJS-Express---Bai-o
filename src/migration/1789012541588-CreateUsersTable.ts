import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1789012541588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.createTable(new Table({
                    name: "users",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "situation_Id",
                            type: "int",
                        },
                        {
                            name: "createAt",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP"
                        },
                        {
                            name: "updatedAt",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP",
                        }
                    ]
                }))
                await queryRunner.createForeignKey("users", new TableForeignKey({
                    columnNames: ["situation_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "situations",
                    onDelete: "CASCADE",
                }) )
            }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("situation_id"));
        if(foreignKey){
            await queryRunner.dropCheckConstraint("users", foreignKey)
        }
        await queryRunner.dropTable("users")
    }

}

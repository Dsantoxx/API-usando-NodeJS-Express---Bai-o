import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User";

@Entity("situations")
export class Situation {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameSituation!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updateAt!: Date;

    @OneToMany(() => User, (user) => user.situation)
    users!: User[]
}
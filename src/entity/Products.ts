import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"

import { ProductCategory } from "./ProductsCategories";
import { ProductSituation } from "./ProductsSituations";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @Column()
    productSituationId!: number;

    @Column()
    productCategoryId!: number;

    @ManyToOne(() => ProductSituation, (situation) => situation.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: ProductSituation;

    @ManyToOne(() => ProductCategory, (category) => category.products)
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: ProductCategory;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
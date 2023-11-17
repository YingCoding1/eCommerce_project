import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatusEnum} from "../helper/Enum";
import {Order} from "./Order";


@Entity()
export class OrderStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    //relation one to many
    @OneToMany(() => Order, order => order.orderStatus)
    orders: Order[]

}
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaymentEnum} from "../helper/Enum";
import {Order} from "./Order";
import {Payment} from "./Payment";


@Entity()
export class PaymentStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string

    //relation one to many
    @OneToMany(() => Payment, payment => payment.paymentStatus)
    payments: Payment[]

}
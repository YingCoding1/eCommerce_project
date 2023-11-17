import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TypeEnum} from "../helper/Enum";
import {Payment} from "./Payment";


@Entity()
export class PaymentType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string

    //relation one to many
    @OneToMany(() => Payment, payment => payment.paymentType)
    payments: Payment[]
}
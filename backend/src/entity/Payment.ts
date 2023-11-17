import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Length, Max, Min} from "class-validator";
import {Order} from "./Order";
import {PaymentStatus} from "./PaymentStatus";
import {PaymentType} from "./PaymentType";


@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: number;

    @Column()
    expiryYear: number;

    @Column()
    expiryMonth: number;

    // todo one to one

    // relation one to many
    @OneToMany(() => Order, order => order.payment)
    orders: Order[]

    // relation many to one
    @ManyToOne(() => PaymentStatus, paymentStatus => paymentStatus.payments, {eager: true})
    paymentStatus: PaymentStatus

    @ManyToOne(() => PaymentType, paymentType => paymentType.payments, {eager: true})
    paymentType: PaymentType

}
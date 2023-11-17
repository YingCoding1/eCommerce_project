import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Length, length, Min} from "class-validator";
import {OrderStatus} from "./OrderStatus";
import {Payment} from "./Payment";
import {User} from "./User";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', {scale: 2})
    itemTotal: number;

    @Column('decimal', {precision: 5, scale: 2, default: 0.05})
    taxRate: number;

    @Column('decimal', {scale: 2})
    tax: number;

    @Column('decimal', {scale: 2})
    total: number;

    @Column()
    // @Length(1,10)
    @Generated("uuid")
    orderNumber: string;

    @Column("simple-json")
    products: { products: string };

    @Column({nullable: true, default: false})
    isActive: boolean;

    @Column({nullable: true, default: false})
    isDelete: boolean;

    @Column()
    @CreateDateColumn()
    create: Date

    @Column()
    @UpdateDateColumn()
    update: Date

    // relation many to one
    @ManyToOne(() => OrderStatus, orderStatus => orderStatus.orders, {eager: true})
    orderStatus: OrderStatus

    @ManyToOne(() => Payment, payment => payment.orders, {eager: true})
    payment: Payment

    @ManyToOne(() => User, user => user.orders, {eager: true})
    user: User
}
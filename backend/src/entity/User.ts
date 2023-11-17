import * as bcrypt from 'bcryptjs'
import {IsEmail, IsNotEmpty} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./Order";



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column({nullable: false})
    @IsNotEmpty()
    @IsEmail()
    username: string

    @Column({nullable: false})
    @IsNotEmpty()
    password: string

    // hash password
    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }

    //relation one to many
    @OneToMany(() => Order, order => order.user)
    orders: Order[]

}
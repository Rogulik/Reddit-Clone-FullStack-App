import { BaseEntity } from 'typeorm'
import { BeforeInsert } from 'typeorm'
import { Column } from 'typeorm'
import { CreateDateColumn } from 'typeorm'
import { Entity } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Index } from 'typeorm'
import { IsEmail } from 'class-validator'
import { Length } from 'class-validator'
import { PrimaryGeneratedColumn } from 'typeorm'
import { UpdateDateColumn } from 'typeorm'

import { classToPlain } from 'class-transformer'

import bcrypt from 'bcrypt'

@Entity('users')
export class User extends BaseEntity {
        constructor(user: Partial<User>){
            super()
            Object.assign(this,user)
        }
    
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
    @Column({ unique: true})
    email: string

    @Index()
    @Length(3,255, { message: 'Username must have 3 characters minimum'})
    @Column({unique: true})
    username: string;

    @Column()
    @Exclude()
    @Length(6,255, { message: 'Password must have 6 characters minimum'})
    password: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6)
    }

    toJSON(){
        return classToPlain(this)
    }
}

import { User } from '../auth/user.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CoffeeStatus } from './coffee.interface'

@Entity()
export class Coffee extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() name: string
  @Column() description: string
  @Column() status: CoffeeStatus
  @ManyToOne((type) => User, (user) => user.coffees, { eager: false }) user: User
  @Column() userId: number
}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Coffee } from 'src/coffees/coffee.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @Column() username: string
  @Column() password: string
  @Column() salt: string
  @OneToMany((type) => Coffee, (coffee) => coffee.user, { eager: true }) coffees: string

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}

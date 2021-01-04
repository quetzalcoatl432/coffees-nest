import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { Coffee } from './coffee.entity'
import { CoffeeDTO, CoffeeStatus, FiltersDTO } from './coffee.interface'
import { CoffeeRepository } from './coffee.repository'

@Injectable()
export class CoffeesService {
  constructor(@InjectRepository(CoffeeRepository) private coffeeRepository: CoffeeRepository) {}
  private coffees: any[] = []

  getCoffees(filters: FiltersDTO, user: User): Promise<Coffee[]> {
    return this.coffeeRepository.getCoffees(filters, user)
  }

  async getCoffeeById(id: number, user: User): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id, userId: user.id } })
    if (!coffee) throw new NotFoundException('No coffees available under that reference')
    else return coffee
  }

  createCoffee(coffee: CoffeeDTO, user: User): Promise<Coffee> {
    return this.coffeeRepository.createCoffee(coffee, user)
  }

  async updateStatus(id: number, status: CoffeeStatus, user: User): Promise<Coffee> {
    let coffee = await this.getCoffeeById(id, user)
    coffee.status = status
    await coffee.save()
    return coffee
  }

  async deleteCoffee(id: number, user: User): Promise<void> {
    let coffee = await this.coffeeRepository.delete({ id, userId: user.id })
    if (!coffee.affected) throw new NotFoundException('No coffees available under that reference')
  }
}

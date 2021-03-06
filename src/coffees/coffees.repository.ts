import { User } from '../auth/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { Coffee } from './coffee.entity'
import { CoffeeDTO, CoffeeStatus, FiltersDTO } from './coffee.interface'

@EntityRepository(Coffee)
export class CoffeesRepository extends Repository<Coffee> {
  async getCoffees(filters: FiltersDTO, user: User): Promise<Coffee[]> {
    const { status, search } = filters
    const query = this.createQueryBuilder('coffee')

    query.where('coffee.userId = :userId', { userId: user.id })
    if (status) query.andWhere('coffee.status = :status', { status })
    if (search)
      query.andWhere('(coffee.title LIKE :search OR coffee.description LIKE :search)', {
        search: `%${search}%`
      })

    const coffees = await query.getMany()
    return coffees
  }

  async createCoffee(coffeeDTO: CoffeeDTO, user: User): Promise<Coffee> {
    const { name, description } = coffeeDTO

    const coffee: Coffee = new Coffee()
    coffee.name = name
    coffee.description = description
    coffee.status = CoffeeStatus.UNAVAILABLE
    coffee.user = user

    await coffee.save()
    delete coffee.user
    return coffee
  }
}

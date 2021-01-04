import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { CoffeeRepository } from './coffee.repository'
import { CoffeesController } from './coffees.controller'
import { CoffeesService } from './coffees.service'

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeRepository]), AuthModule],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

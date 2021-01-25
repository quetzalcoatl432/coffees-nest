import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { CoffeesRepository } from './coffees.repository'
import { CoffeesController } from './coffees.controller'
import { CoffeesService } from './coffees.service'

@Module({
  imports: [TypeOrmModule.forFeature([CoffeesRepository]), AuthModule],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

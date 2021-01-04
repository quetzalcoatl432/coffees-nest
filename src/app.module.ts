import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './base/typeorm.config'
import { CoffeesModule } from './coffees/coffees.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CoffeesModule, AuthModule]
})
export class AppModule {}

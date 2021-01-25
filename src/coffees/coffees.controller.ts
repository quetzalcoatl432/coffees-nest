import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserDecorator } from '../auth/auth.decorator'
import { User } from '../auth/user.entity'
import { StatusValidationPipe } from '../base/status-validation.pipe'
import { Coffee } from './coffee.entity'
import { CoffeeDTO, CoffeeStatus, FiltersDTO } from './coffee.interface'
import { CoffeesService } from './coffees.service'

@Controller('coffees')
@UseGuards(AuthGuard())
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  getCoffees(@Query(ValidationPipe) filters: FiltersDTO, @UserDecorator() user: User): Promise<Coffee[]> {
    return this.coffeesService.getCoffees(filters, user)
  }

  @Get(':id')
  getCoffeeById(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: User): Promise<Coffee> {
    return this.coffeesService.getCoffeeById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCoffee(@Body() coffee: CoffeeDTO, @UserDecorator() user: User): Promise<Coffee> {
    return this.coffeesService.createCoffee(coffee, user)
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusValidationPipe) status: CoffeeStatus,
    @UserDecorator() user: User
  ): Promise<Coffee> {
    return this.coffeesService.updateStatus(id, status, user)
  }

  @Delete(':id')
  deleteCoffee(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: User): Promise<any> {
    return this.coffeesService.deleteCoffee(id, user)
  }
}

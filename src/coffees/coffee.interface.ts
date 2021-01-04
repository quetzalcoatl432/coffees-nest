import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export enum CoffeeStatus {
  AVAILABLE = 'AVAILABLE',
  LIMITED = 'LIMITED',
  UNAVAILABLE = 'UNAVAILABLE'
}

export class CoffeeDTO {
  @IsNotEmpty() name: string
  @IsNotEmpty() description: string
}

export class FiltersDTO {
  @IsOptional() @IsIn(Object.keys(CoffeeStatus).map((key) => CoffeeStatus[key])) status: CoffeeStatus
  @IsOptional() @IsNotEmpty() search: string
}

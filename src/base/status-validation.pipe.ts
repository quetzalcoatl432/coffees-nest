import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { CoffeeStatus } from 'src/coffees/coffee.interface'

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const validStatuses = Object.keys(CoffeeStatus).map((key) => CoffeeStatus[key])
    if (!validStatuses.includes(value.toUpperCase())) throw new BadRequestException('Invalid status')
    return value
  }
}

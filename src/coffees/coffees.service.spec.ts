import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CoffeeDTO, CoffeeStatus, FiltersDTO } from './coffee.interface'
import { CoffeesRepository } from './coffees.repository'
import { CoffeesService } from './coffees.service'

const mockCoffeesRepository = () => ({
  getCoffees: jest.fn(),
  findOne: jest.fn(),
  createCoffee: jest.fn(),
  delete: jest.fn()
})

const mockUser: any = { id: 1, username: 'Test user' }

describe('CoffeesService', () => {
  let service: CoffeesService
  let repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService, { provide: CoffeesRepository, useFactory: mockCoffeesRepository }]
    }).compile()

    service = module.get<CoffeesService>(CoffeesService)
    repository = module.get<CoffeesRepository>(CoffeesRepository)
  })

  describe('getCoffees', () => {
    it('gets all coffees', async () => {
      repository.getCoffees.mockResolvedValue([])

      expect(repository.getCoffees).not.toHaveBeenCalled()
      const filters: FiltersDTO = { status: CoffeeStatus.AVAILABLE, search: '' }
      const result = await repository.getCoffees(filters, mockUser)
      expect(repository.getCoffees).toHaveBeenCalled()
      expect(result).toEqual([])
    })
  })

  describe('getCoffeeById', () => {
    it('retrieves and returns a coffee variant', async () => {
      const mockCoffee = { title: 'Test coffee', description: 'Test description' }
      repository.findOne.mockResolvedValue(mockCoffee)

      const result = await service.getCoffeeById(1, mockUser)
      expect(result).toEqual(mockCoffee)
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: mockUser.id } })
    })

    it('throws an error when failing to find a coffee variant', () => {
      repository.findOne.mockResolvedValue(null)
      expect(service.getCoffeeById(1, mockUser)).rejects.toThrow(NotFoundException)
    })
  })

  describe('createCoffee', () => {
    it('creates a coffee variant', async () => {
      const mockCoffee: CoffeeDTO = { name: 'Test coffee', description: 'Test description' }
      repository.createCoffee.mockResolvedValue(mockCoffee)

      expect(repository.createCoffee).not.toHaveBeenCalled()
      const result = await service.createCoffee(mockCoffee, mockUser)
      expect(repository.createCoffee).toHaveBeenCalledWith(mockCoffee, mockUser)
      expect(result).toEqual(mockCoffee)
    })
  })

  describe('deleteCoffee', () => {
    it('deletes a coffee variant', async () => {
      repository.delete.mockResolvedValue({ affected: 1 })
      expect(repository.delete).not.toHaveBeenCalled()
      await service.deleteCoffee(1, mockUser)
      expect(repository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id })
    })

    it('throws an error when failing to find a coffee variant', () => {
      repository.delete.mockResolvedValue({ affected: 0 })
      expect(service.deleteCoffee(1, mockUser)).rejects.toThrow(NotFoundException)
    })
  })

  describe('updateStatus', () => {
    it('updates the status of a coffee variant', async () => {
      const save = jest.fn().mockResolvedValue(true),
        mockCoffee = {
          status: CoffeeStatus.UNAVAILABLE,
          save
        }
      repository.findOne.mockResolvedValue(mockCoffee)

      expect(repository.findOne).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await service.updateStatus(1, CoffeeStatus.AVAILABLE, mockUser)
      expect(repository.findOne).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result.status).toEqual(CoffeeStatus.AVAILABLE)
    })
  })
})

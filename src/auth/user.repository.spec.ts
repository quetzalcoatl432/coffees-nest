import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from './user.repository'

const mockUser: any = { username: 'Test user', password: 'Test' }

describe('AuthService', () => {
  let repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository]
    }).compile()

    repository = module.get<UserRepository>(UserRepository)
  })

  describe('signUp', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      repository.create = jest.fn().mockReturnValue({ save })
    })

    it('registers a user', () => {
      save.mockResolvedValue(undefined)
      expect(repository.signUp(mockUser)).resolves.not.toThrow()
    })

    it('throws an error if finds a duplicate-username conflict', () => {
      save.mockRejectedValue({ code: '23505' })
      expect(repository.signUp(mockUser)).rejects.toThrow(ConflictException)
    })

    it('throws an error if server fails', () => {
      save.mockRejectedValue({ code: '500' })
      expect(repository.signUp(mockUser)).rejects.toThrow(InternalServerErrorException)
    })
  })
})

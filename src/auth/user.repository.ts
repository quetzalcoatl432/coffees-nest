import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'
import { AuthCredentialsDTO } from './user.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, user.salt)

    try {
      await user.save()
    } catch (error) {
      if (error.code == 23505) throw new ConflictException('Username already exists')
      else throw new InternalServerErrorException()
    }
  }

  async signIn(authCredentials: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentials

    const user = await this.findOne({ username })
    if (user && (await user.validatePassword(password))) return user.username
  }
}

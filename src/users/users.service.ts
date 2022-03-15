import { User } from '@generated'
import { Injectable, NotFoundException } from '@nestjs/common'
import cuid from 'cuid'

interface CreateUserArgs {
  name: string
}

@Injectable()
export class UsersService {
  private _users: User[] = []

  findOne(id: string): User {
    const user = this._users.find((user) => user.id === id)
    if (!user) {
      throw new NotFoundException('user does not exist')
    }
    return user
  }

  create({ name }: CreateUserArgs) {
    const user: User = {
      id: cuid(),
      createdAt: new Date().toISOString(),
      name,
      posts: [],
    }
    this._users.push(user)
    return { ...user }
  }
}

import { Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { User, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null
  }

  async create(data: Prisma.UserCreateInput) {
    const newUser = {
      id: randomUUID(),
      created_at: new Date(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    } as User

    this.users.push(newUser)

    return newUser
  }
}

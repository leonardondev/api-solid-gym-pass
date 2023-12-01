import { Prisma, User as PrismaUserModel } from '@prisma/client'

export type User = PrismaUserModel

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}

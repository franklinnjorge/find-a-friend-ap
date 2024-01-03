import { Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  create(ong: Prisma.OngUncheckedCreateInput): Promise<Ong>
  findById(id: string): Promise<Ong | null>
  findByEmail(email: string): Promise<Ong | null>
}

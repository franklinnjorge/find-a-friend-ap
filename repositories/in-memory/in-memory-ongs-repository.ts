import { Ong, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { OngsRepository } from 'repositories/ongs-repository'

export class InMemoryOngsRepository implements OngsRepository {
  public item: Ong[] = []

  async create(data: Prisma.OngUncheckedCreateInput): Promise<Ong> {
    const ong: Ong = {
      id: randomUUID(),
      city: data.city,
      uf: data.uf,
      created_at: new Date(),
      email: data.email,
      name: data.name,
      password_hash: await hash(data.password_hash, 6),
      phone: data.phone,
      cep: data.cep,
    }

    this.item.push(ong)
    return ong
  }

  async findById(id: string) {
    const ong = this.item.find((ong) => ong.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = this.item.find((ong) => ong.email === email)

    if (!ong) {
      return null
    }

    return ong || null
  }
}

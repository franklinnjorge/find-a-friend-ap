import { Pet, Prisma } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from 'repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public item: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: randomUUID(),
      created_at: new Date(),
      name: data.name,
      ong_id: data.ong_id,
      description: data.description,
      photo: data.photo,
      specie: data.specie,
      size: data.size,
      age: data.age,
      energy: data.energy,
      temper: data.temper,
      independence: data.independence,
      requirements: data.requirements as JsonValue, // Cast the requirements property to JsonValue
    }

    this.item.push(newPet)
    return newPet
  }

  async findByOngId(id: string) {
    return this.item.find((item) => item.ong_id === id)
  }

  async filterByCharacteristics(query: string) {
    const filters = query.split(',').map((param) => param.trim())

    return this.item.filter((pet) => {
      return filters.every((filter) => {
        const [property, value] = filter.split(': ')
        return pet[property as keyof Pet] === value
      })
    })
  }
}

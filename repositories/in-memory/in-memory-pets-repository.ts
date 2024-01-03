import {
  AnimalAge,
  AnimalEnergy,
  AnimalSize,
  AnimalSpecies,
  AnimalTemper,
  LevelOfIndependence,
  Pet,
  Prisma,
} from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from 'repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public item: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: randomUUID(),
      created_at: new Date(),
      name: data.name,
      ong_id: '',
      description: '',
      photo: '',
      specie: AnimalSpecies.DOG,
      size: AnimalSize.BIG,
      age: AnimalAge.ADULT,
      energy: AnimalEnergy.HIGH,
      temper: AnimalTemper.QUIET,
      independence: LevelOfIndependence.LOW,
      requirements: '',
    }

    this.item.push(newPet)
    return newPet
  }
}

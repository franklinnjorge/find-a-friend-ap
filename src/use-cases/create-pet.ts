import {
  AnimalAge,
  AnimalEnergy,
  AnimalSize,
  AnimalSpecies,
  AnimalTemper,
  LevelOfIndependence,
} from '@prisma/client'
import { randomUUID } from 'crypto'
import { OngsRepository } from 'repositories/ongs-repository'
import { PetsRepository } from 'repositories/pets-repository'
import { ResourceNotFoundError } from './erros/resource-not-found'

export interface CreatePetUseCaseRequest {
  name: string
  description: string
  photo: string
  specie: AnimalSpecies
  size: AnimalSize
  age: AnimalAge
  energy: AnimalEnergy
  temper: AnimalTemper
  independence: LevelOfIndependence
  requirements: string
  ong_id: string
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
  ) {}

  async execute(data: CreatePetUseCaseRequest) {
    const ongExist = await this.ongsRepository.findById(data.ong_id)

    if (!ongExist) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      age: data.age,
      description: data.description,
      energy: data.energy,
      id: randomUUID(),
      independence: data.independence,
      name: data.name,
      ong_id: data.ong_id,
      photo: data.photo,
      requirements: data.requirements,
      size: data.size,
      specie: data.specie,
      temper: data.temper,
    })

    return {
      pet,
    }
  }
}

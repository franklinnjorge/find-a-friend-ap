import { Pet } from '@prisma/client'
import { OngsRepository } from 'repositories/ongs-repository'
import { PetsRepository } from 'repositories/pets-repository'
import { ResourceNotFoundError } from './erros/resource-not-found'

export interface FindManyPetByUfUseCaseRequest {
  uf: string
}

export interface FindManyPetByUfUseCaseResponse {
  petsList: Pet[]
}

export class FindManyPetByUfUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
  ) {}

  async execute(
    data: FindManyPetByUfUseCaseRequest,
  ): Promise<FindManyPetByUfUseCaseResponse> {
    const ongsList = await this.ongsRepository.findManyByUf(data.uf)
    let petsList: Pet[] = []

    if (ongsList?.length === 0) {
      throw new ResourceNotFoundError()
    }

    ongsList?.forEach(async (ong) => {
      const pet = await this.petsRepository.findByOngId(ong.id)

      if (pet) {
        petsList.push(pet)
      }
    })

    return {
      petsList,
    }
  }
}

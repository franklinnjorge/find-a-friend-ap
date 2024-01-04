import { Pet } from '@prisma/client'
import { PetsRepository } from 'repositories/pets-repository'
import { ResourceNotFoundError } from './erros/resource-not-found'

export interface FilterPetsByCharacteristicsUseCaseRequest {
  query: string
}

export interface FilterPetsByCharacteristicsUseCaseResponse {
  petsList: Pet[]
}

export class FilterPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: FilterPetsByCharacteristicsUseCaseRequest,
  ): Promise<FilterPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.filterByCharacteristics(data.query)

    if (pets?.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      petsList: pets || [],
    }
  }
}

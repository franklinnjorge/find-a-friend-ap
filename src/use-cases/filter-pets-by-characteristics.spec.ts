import { InMemoryOngsRepository } from 'repositories/in-memory/in-memory-ongs-repository'
import { InMemoryPetsRepository } from 'repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsByCharacteristicsUseCase } from './filter-pets-by-characteristics'

let ongsRepository: InMemoryOngsRepository
let petsRepository: InMemoryPetsRepository
let sut: FilterPetsByCharacteristicsUseCase

describe('Filter pets by Characteristics', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsByCharacteristicsUseCase(petsRepository)
  })

  it('should be able to filter PETS by Characteristics', async () => {
    const ong = await ongsRepository.create({
      id: 'ong-id-01',
      email: 'any_email',
      name: 'any_name',
      cep: '05783160',
      password_hash: 'password.123',
      phone: 'any_phone',
      city: 'São Paulo',
      uf: 'SP',
    })

    petsRepository.create({
      age: 'PUPPY',
      description: 'any_description',
      energy: 'HIGH',
      independence: 'LOW',
      name: 'Pudim',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'Big House',
      size: 'BIG',
      specie: 'DOG',
      temper: 'QUIET',
    })

    petsRepository.create({
      age: 'PUPPY',
      description: 'any_description',
      energy: 'HIGH',
      independence: 'LOW',
      name: 'Totó',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'any_requirements',
      size: 'SMALL',
      specie: 'DOG',
      temper: 'QUIET',
    })

    petsRepository.create({
      age: 'PUPPY',
      description: 'Smart cat',
      energy: 'LOW',
      independence: 'HIGH',
      name: 'Paçoca',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'House',
      size: 'SMALL',
      specie: 'CAT',
      temper: 'QUIET',
    })

    petsRepository.create({
      age: 'PUPPY',
      description: 'Crazy sometimes',
      energy: 'VERY_HIGH',
      independence: 'HIGH',
      name: 'Mandala',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'House',
      size: 'BIG',
      specie: 'DOG',
      temper: 'VERY_AGITATED',
    })

    const { petsList } = await sut.execute({
      query: 'DOG, VERY_AGITATED',
    })

    expect(petsList).toEqual(expect.any(Array))
    expect(petsList).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Mandala' })]),
    )
  })
})

import { InMemoryOngsRepository } from 'repositories/in-memory/in-memory-ongs-repository'
import { InMemoryPetsRepository } from 'repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindManyPetByUfUseCase } from './find-many-pet-by-uf'

let ongsRepository: InMemoryOngsRepository
let petsRepository: InMemoryPetsRepository
let sut: FindManyPetByUfUseCase

describe('Find pet by UF', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FindManyPetByUfUseCase(petsRepository, ongsRepository)
  })

  it('should be able to list PETS by UF', async () => {
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
      age: 'ADULT',
      description: 'any_description',
      energy: 'HIGH',
      independence: 'LOW',
      name: 'any_name',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'any_requirements',
      size: 'BIG',
      specie: 'DOG',
      temper: 'QUIET',
    })

    petsRepository.create({
      age: 'PUPPY',
      description: 'any_description',
      energy: 'HIGH',
      independence: 'LOW',
      name: 'Pitbull',
      ong_id: ong.id,
      photo: 'any_photo',
      requirements: 'any_requirements',
      size: 'BIG',
      specie: 'DOG',
      temper: 'QUIET',
    })

    const { petsList } = await sut.execute({
      uf: 'SP',
    })

    expect(petsList).toEqual(expect.any(Array))
  })
})

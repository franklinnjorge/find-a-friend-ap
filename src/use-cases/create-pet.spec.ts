import { InMemoryPetsRepository } from 'repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOngsRepository } from 'repositories/in-memory/in-memory-ongs-repository'
import { ResourceNotFoundError } from './erros/resource-not-found'

let petRepository: InMemoryPetsRepository
let ongsRepository: InMemoryOngsRepository
let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    ongsRepository = new InMemoryOngsRepository()
    sut = new CreatePetUseCase(petRepository, ongsRepository)
  })

  it('should be able to create a pet', async () => {
    const ong = await ongsRepository.create({
      city: 'any_city',
      email: 'any_email',
      name: 'any_name',
      cep: 'any_cep',
      password_hash: 'tes',
      phone: 'any_phone',
      uf: 'any_uf',
    })

    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without a ONG ID', async () => {
    await expect(async () => {
      await sut.execute({
        age: 'ADULT',
        description: 'any_description',
        energy: 'HIGH',
        independence: 'LOW',
        name: 'any_name',
        ong_id: 'any_ong_id',
        photo: 'any_photo',
        requirements: 'any_requirements',
        size: 'BIG',
        specie: 'DOG',
        temper: 'QUIET',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

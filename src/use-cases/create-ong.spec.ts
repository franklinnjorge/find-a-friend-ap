import { InMemoryOngsRepository } from 'repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOngUseCase } from './create-ong'
import { OngAlreadyExistsError } from './erros/ong-already-exist-error'

let ongsRepository: InMemoryOngsRepository
let sut: CreateOngUseCase

describe('Create Ong', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new CreateOngUseCase(ongsRepository)
  })

  it('should be able to create an ong', async () => {
    const { ong } = await sut.execute({
      city: 'any_city',
      email: 'any_email',
      name: 'any_name',
      cep: 'any_cep',
      password: 'tes',
      phone: 'any_phone',
      uf: 'any_uf',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new ong with the same email', async () => {
    await sut.execute({
      city: 'any_city',
      email: 'any_email',
      name: 'any_name',
      cep: 'any_cep',
      password: 'tes',
      phone: 'any_phone',
      uf: 'any_uf',
    })

    await expect(async () => {
      await sut.execute({
        city: 'any_city',
        email: 'any_email',
        name: 'any_name',
        cep: 'any_cep',
        password: 'tes',
        phone: 'any_phone',
        uf: 'any_uf',
      })
    }).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})

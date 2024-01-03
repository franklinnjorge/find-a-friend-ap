import { hash } from 'bcryptjs'
import { OngsRepository } from 'repositories/ongs-repository'
import { OngAlreadyExistsError } from './erros/ong-already-exist-error'

export interface CreateOngUseCaseRequest {
  name: string
  phone: string
  cep: string
  city: string
  uf: string
  email: string
  password: string
}

export class CreateOngUseCase {
  constructor(private ongsRepository: OngsRepository) {}

  async execute(data: CreateOngUseCaseRequest) {
    const password_hash = await hash(data.password, 6)
    const ongExist = await this.ongsRepository.findByEmail(data.email)

    if (ongExist) {
      throw new OngAlreadyExistsError()
    }

    const ong = await this.ongsRepository.create({
      name: data.name,
      email: data.email,
      cep: data.cep,
      phone: data.phone,
      city: data.city,
      uf: data.uf,
      password_hash,
    })

    return {
      ong,
    }
  }
}

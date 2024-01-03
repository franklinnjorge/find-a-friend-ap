import { hash } from 'bcryptjs'
import { OngsRepository } from 'repositories/ongs-repository'
import { OngAlreadyExistsError } from './erros/ong-already-exist-error'
import { GetLocationsByCepUseCase } from './utils/get-location-by-zip-code'

export interface CreateOngUseCaseRequest {
  name: string
  phone: string
  cep: string
  email: string
  password: string
}

export class CreateOngUseCase {
  constructor(private ongsRepository: OngsRepository) {}

  async execute(data: CreateOngUseCaseRequest) {
    let zipCodeValidation: GetLocationsByCepUseCase
    zipCodeValidation = new GetLocationsByCepUseCase()
    const password_hash = await hash(data.password, 6)
    const ongExist = await this.ongsRepository.findByEmail(data.email)
    const fullAddress = await zipCodeValidation.execute(data.cep)

    if (ongExist) {
      throw new OngAlreadyExistsError()
    }

    const ong = await this.ongsRepository.create({
      name: data.name,
      email: data.email,
      cep: fullAddress.code,
      phone: data.phone,
      city: fullAddress.city,
      uf: fullAddress.code,
      password_hash,
    })

    return {
      ong,
    }
  }
}

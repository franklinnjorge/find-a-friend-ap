import axios from 'axios'
import { InvalidZipCodeError } from '../erros/invalid-zip-code-error'

export interface GetLocationsByCepResponse {
  address: string
  city: string
  code: string
  district: string
  state: string
}

export class GetLocationsByCepUseCase {
  async execute(zipCode: string): Promise<GetLocationsByCepResponse> {
    const zipCodeUnformated = zipCode.replace(/\D/g, '')
    if (zipCodeUnformated.length !== 8) {
      throw new InvalidZipCodeError()
    }

    const validZipCode = `${zipCodeUnformated.substr(
      0,
      5,
    )}-${zipCodeUnformated.substr(5, 3)}`

    const { data } = await axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${validZipCode}/json/`,
    })

    return {
      address: data.logradouro,
      city: data.localidade,
      code: data.cep,
      district: data.bairro,
      state: data.uf,
    }
  }
}

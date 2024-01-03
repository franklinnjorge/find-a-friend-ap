import { beforeEach, describe, expect, it } from 'vitest'
import { GetLocationsByCepUseCase } from './get-location-by-zip-code'

let sut: GetLocationsByCepUseCase

describe('Find Zip Code full address', () => {
  beforeEach(() => {
    sut = new GetLocationsByCepUseCase()
  })

  it('should be able to get a address informations by zip code', async () => {
    const { code } = await sut.execute('05783160')

    expect(code).toEqual(expect.any(String))
  })
})

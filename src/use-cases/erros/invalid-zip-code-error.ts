export class InvalidZipCodeError extends Error {
  constructor() {
    super('Invalid zip code. Must contain exactly 8 digits.')
  }
}

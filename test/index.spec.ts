import * as env from '..'

beforeAll(() => {
  process.env.EXAMPLE_VAR = 'example'
})

describe('env.required', () => {
  it('should return an environment variable', () => {
    expect(env.required.EXAMPLE_VAR).toBe('example')
  })

  it('should support key in operator', () => {
    expect('EXAMPLE_VAR' in env.required).toBe(true)
  })

  it('should return the keys of all environment variables', () => {
    expect(Object.keys(env.required)).toEqual(Object.keys(process.env))
    expect(Object.getOwnPropertyNames(env.required)).toEqual(Object.getOwnPropertyNames(process.env))
  })

  it('should throw an error for missing required environment variables', () => {
    expect(() => env.required.DOES_NOT_EXIST).toThrow()
  })
})

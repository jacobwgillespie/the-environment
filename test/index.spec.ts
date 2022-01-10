import * as env from '..'

beforeAll(() => {
  process.env.EXAMPLE_VAR = 'example'
})

describe('env.optional', () => {
  it('should return an environment variable', () => {
    expect(env.optional.EXAMPLE_VAR).toBe('example')
  })

  it('should support key in operator', () => {
    expect('EXAMPLE_VAR' in env.optional).toBe(true)
  })

  it('should return the keys of all environment variables', () => {
    expect(Object.keys(env.optional)).toEqual(Object.keys(process.env))
    expect(Object.getOwnPropertyNames(env.optional)).toEqual(Object.getOwnPropertyNames(process.env))
  })

  it('should not throw an error for missing optional environment variables', () => {
    expect(() => env.optional.DOES_NOT_EXIST).not.toThrow()
  })
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
    expect(() => env.required.DOES_NOT_EXIST).toThrow(env.MissingEnvironmentVariableError)
  })
})

describe('MissingEnvironmentVariableError', () => {
  it('should store the name of the missing environment variable', () => {
    const error = new env.MissingEnvironmentVariableError('EXAMPLE_VAR')
    expect(error.variable).toBe('EXAMPLE_VAR')
  })
})

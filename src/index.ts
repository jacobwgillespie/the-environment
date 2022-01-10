export type Env = {[key: string]: string}
export type OptionalEnv = {[key: string]: string | undefined}

export const optional = new Proxy<OptionalEnv>(process.env, {
  get: (target, key: string) => {
    return target[key]
  },
})

export const required = new Proxy<Env>(optional as Env, {
  get: (target, key: string) => {
    const value = target[key]
    if (value === undefined) throw new MissingEnvironmentVariableError(key)
    return value
  },
})

export class MissingEnvironmentVariableError extends Error {
  constructor(public variable: string) {
    super(`Missing required environment variable: ${variable}`)
    Error.captureStackTrace(this, MissingEnvironmentVariableError)
  }
}

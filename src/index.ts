export type Env = {[key: string]: string}
export type OptionalEnv = {[key: string]: string | undefined}

/** All of `process.env`, returns undefined if a variable is missing. */
export const optional = new Proxy<OptionalEnv>(process.env, {
  get: (target, key: string) => {
    return target[key]
  },
})

/** All of `process.env`, throws an error if a variable is missing. */
export const required = new Proxy<Env>(optional as Env, {
  get: (target, key: string) => {
    const value = target[key]
    if (value === undefined) throw new MissingEnvironmentVariableError(key)
    return value
  },
})

/** Represents a required environment variable that was missing (not set). */
export class MissingEnvironmentVariableError extends Error {
  /** The name of the missing environment variable. */
  variable: string

  /**
   * Represents a required environment variable that was missing (not set).
   *
   * @param variable The name of the missing environment variable.
   */
  constructor(variable: string) {
    super(`Missing required environment variable: ${variable}`)
    Error.captureStackTrace(this, MissingEnvironmentVariableError)
    this.variable = variable
  }
}

import auth from './auth'

// Create repositories for all API
interface IApi {
  auth: typeof auth
}
const repositories: IApi = {
  auth,
}

// Get key of repositories
type TKeyRepo = keyof IApi

// Create factory with get(key in KeyRepoType)
const factory = {
  get: (name: TKeyRepo) => repositories[name],
}

export default factory

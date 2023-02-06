import factory from '@/api/factory'
import useAuthStore from '@/stores/auth'
export default function useAuth() {
  // Import
  const api = factory.get('auth')
  const { setAuth } = useAuthStore()
  const { setToken } = useAccountStorage()

  // method
  const login = ({ email = '', password = '' }) => {
    const { data, isFinished, error, execute } = api.login({ email, password })

    execute()
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (error.value) {
          return Promise.reject(error.value)
        }
        // Set auth and token if login successfull
        setAuth(data.value)
        setToken(data?.value?.token?.access_token)
        return Promise.resolve(data.value)
      })
  }

  return {
    login,
  }
}

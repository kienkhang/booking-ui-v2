import factory from '@/api/factory'
import useAuthStore from '@/stores/auth'

export default function useAuth() {
  // Import
  const api = factory.get('auth')
  const { setAuth } = useAuthStore()
  const { setToken } = useAccountStorage()

  // method
  const login = ({ email = '', password = '' }) => {
    const usedLogin = api.login({ email, password })
    const { data, isFinished, error, execute } = usedLogin

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!!error.value === false) {
          setAuth(data.value)
          setToken(data?.value?.token?.access_token)
        } else {
          throw new Error('Lỗi khi gọi API')
        }
      })
    return {
      ...usedLogin,
      executeAPI: () => execute(),
    }
  }

  return {
    login,
  }
}

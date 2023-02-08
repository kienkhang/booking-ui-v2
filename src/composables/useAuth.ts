import factory from '@/api/factory'
import useAuthStore from '@/stores/auth'
export default function useAuth() {
  // Import
  const api = factory.get('auth')
  const { setAuth } = useAuthStore()
  const { setToken, removeToken } = useAccountStorage()
  // method
  // --------------------------------
  const login = (data?: { email: string; password: string }) => {
    const usedLogin = api.login({})
    const { data: respData, isFinished, error, execute } = usedLogin

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!!error.value === false) {
          setAuth(respData.value)
          setToken(respData?.value?.token?.access_token)
        } else {
          throw new Error(error.value?.response?.data.message!)
        }
      })
    return {
      ...usedLogin,
      executeAPI: () => execute({ data }),
    }
  }
  // --------------------------------
  const getProfile = () => {
    const usedGetme = api.getMe()
    const { data, isFinished, execute } = usedGetme

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        setAuth(data.value)
      })
    return {
      ...usedGetme,
      executeAPI: () => execute(),
    }
  }
  // --------------------------------
  const logout = () => {
    setAuth(null)
    removeToken()
  }

  return {
    login,
    logout,
    getProfile,
  }
}

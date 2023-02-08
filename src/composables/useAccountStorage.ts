import { useCookies } from '@vueuse/integrations/useCookies'

const ACCOUNT_STORAGE_PREFIX = 'account.'
const TOKEN = ACCOUNT_STORAGE_PREFIX + 'token'

export default function useAccountStorage() {
  const { get, set, remove } = useCookies([TOKEN])

  const getToken = () => <string>get(TOKEN)
  const setToken = (value: string) => set(TOKEN, value)
  const removeToken = () => remove(TOKEN)

  const isLoggedIn = () => !!getToken()

  return {
    getToken,
    setToken,
    removeToken,
    isLoggedIn,
  }
}

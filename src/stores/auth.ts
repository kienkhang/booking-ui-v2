const useAuthStore = defineStore('auth', () => {
  // Hook

  // const { setToken } = useAccountStorage()

  // State
  const account = ref<Account | null>(null)
  // getters

  // methods

  const setAuth = (authAccount: Account | null) => {
    account.value = authAccount
  }

  return {
    account,
    setAuth,
  }
})

export default useAuthStore

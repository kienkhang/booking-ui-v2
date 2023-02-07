import { defineStore, StoreGeneric, storeToRefs } from 'pinia'
import { once, pick } from 'lodash-es'
type TCreatePiniaStateReturn<T> = {
  useStore: () => T
  disposeStore: () => void
  resetStore: () => void
}

export const createPiniaState = <T>(
  name: string,
  stateFactory: () => T
): TCreatePiniaStateReturn<T> => {
  const useStore = defineStore(name, stateFactory)

  const useStoreSetup = once(() => {
    const usedStore = useStore() // usedStore is Object
    // Get all method (Action) from Store, check typeof value by key, filter by 'function'
    type TKeyOfUsedStore = keyof typeof usedStore
    const usedStoreMethodName = Object.keys(usedStore).filter(
      (key: string) =>
        typeof usedStore[key as TKeyOfUsedStore] === 'function' &&
        !key.startsWith('$') &&
        !key.startsWith('_')
    ) as string[]
    return {
      // return reactive state
      ...storeToRefs(usedStore as StoreGeneric),
      // return method (store pick method_key)
      ...pick(usedStore, usedStoreMethodName),
    } as T
  })

  // Destroy state from store
  const disposeStore = () => useStore().$dispose()
  //  Reset state in store
  const resetStore = () => useStore().$reset()

  return {
    useStore: useStoreSetup,
    disposeStore,
    resetStore,
  }
}

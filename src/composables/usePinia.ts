import { StoreGeneric, storeToRefs, defineStore } from 'pinia'
import pick from 'lodash-es/pick'
import once from 'lodash-es/once'
type TCreateStore<T> = {
  useStore: () => T
  disposeStore: () => void
  resetStore: () => void
}

export default function usePinia<T>(name: string, store: () => T): TCreateStore<T> {
  const useStoreInit = defineStore(name, store)

  // Make sure useStore only calls once <=> store just creates once on install
  const useStore = once((): T => {
    const usedStore = useStoreInit()
    // Get all function name in usedStore
    type TUsedStoreKey = keyof typeof usedStore
    const fnNames = Object.keys(usedStore).filter((key: string) => {
      return (
        typeof usedStore[key as TUsedStoreKey] === 'function' &&
        !key.startsWith('$') &&
        !key.startsWith('_')
      )
    }) as string[]

    return {
      ...storeToRefs(usedStore as StoreGeneric),
      // Get function with key contained in fnNames
      ...pick(usedStore, fnNames),
    } as T
  })

  const disposeStore = () => useStoreInit().$dispose()

  const resetStore = () => useStoreInit().$reset()

  return {
    useStore,
    disposeStore,
    resetStore,
  }
}

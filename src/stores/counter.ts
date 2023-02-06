// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

import { createPiniaState } from '@/utils/pinia'

//
// })

const useCounter = () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}

const { useStore: useCounterStore, disposeStore } = createPiniaState('count', useCounter)

export { disposeStore }
export default useCounterStore

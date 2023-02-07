// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

import usePinia from '@/composables/usePinia'

const useCounter = () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}

const { useStore: useCounterStore, disposeStore } = usePinia('count', useCounter)

export { disposeStore }
export default useCounterStore

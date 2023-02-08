<template>
  <div>
    <div>This is home page</div>
    <div class="text-lg font-bold text-purple-600" v-show="account !== null">
      {{ account?.customer.full_name }}
    </div>
    <div class="text-lg font-bold">Count : {{ count }}</div>
    <div class="text-lg font-bold">Double Count : {{ doubleCount }}</div>
    <button class="p-2 rounded-md bg-green-600 text-white" @click="increment">Increment</button>
    <!-- <button class="p-2 rounded-md bg-blue-600 text-white" @click="disposeCounter">
      DisposeCounter
    </button> -->
    <button class="p-2 rounded-md bg-red-600 text-white" @click="navigate">Go to 404</button>
    <HelloWorld :msg="'Khang'"></HelloWorld>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import useCounterStore from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { _definePage } from 'unplugin-vue-router/runtime'

_definePage({
  meta: {
    requiresAuth: true,
    layout: 'main',
  },
})

const router = useRouter()
const store = useCounterStore()
const { account } = storeToRefs(useAuthStore())

const { increment, count, doubleCount } = store

const navigate = () => {
  router.push('/')
}
</script>

<route lang="yaml">
meta:
  layout: main
  requiresAuth: true
</route>

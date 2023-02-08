<template>
  <button @click="navigate" class="flex gap-2 p-2 rounded-md bg-red-400 items-center text-white">
    <ILocalCoffee class="w-8 h-8"></ILocalCoffee> Go to Home Page
  </button>
</template>

<script setup lang="ts">
const router = useRouter()
const navigate = () => {
  router.push('home')
}
</script>

<route lang="yaml">
meta:
  layout: default
  name: 'index'
</route>

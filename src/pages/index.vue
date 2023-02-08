<template>
  <button @click="navigate">Go to Home Page</button>
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

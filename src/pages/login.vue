<template>
  <TheWelcome></TheWelcome>
  <button @click="navigate" class="p-2 bg-green-500 textwhite">Go to Home Page</button>
</template>

<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
const router = useRouter()
const navigate = () => {
  router.push('home')
}
</script>

<route lang="yaml">
meta:
  layout: default
</route>

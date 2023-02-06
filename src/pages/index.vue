<template>
  <div>Không tìm thấy thông tin</div>
  <button @click="navigate">Go to Home Page</button>
  <TheWelcome></TheWelcome>
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
  layout: 404
</route>

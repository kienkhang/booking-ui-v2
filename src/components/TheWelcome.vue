<template>
  <div v-if="account" class="text-green-700 font-bold">Have Account</div>
  <FormKit type="form" submit-label="Login" @submit="onLogin">
    <FormKit type="text" label="Email" name="email" validation="email|required"></FormKit>
    <FormKit type="password" label="Password" name="password" validation="required"></FormKit>
  </FormKit>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'

const { login } = useAuth()
const { account } = useAuthStore()
const onLogin = ({ email = '', password = '' }) => {
  login({ email, password })
}
</script>

<style scoped></style>

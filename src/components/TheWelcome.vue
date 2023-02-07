<template>
  <div v-if="isLoggedIn" class="text-green-700 font-bold">Have Account</div>
  <FormKit type="form" submit-label="Login" @submit="onLogin">
    <FormKit type="text" label="Email" name="email" validation="email|required"></FormKit>
    <FormKit type="password" label="Password" name="password" validation="required"></FormKit>
  </FormKit>
</template>

<script setup lang="ts">
const { login } = useAuth()
const { isLoggedIn } = useAccountStorage()
const onLogin = ({ email = '', password = '' }) => {
  const { isLoading, executeAPI } = login({ email, password })
  executeAPI()
}
</script>

<style scoped></style>

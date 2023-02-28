<template>
  <FormKit type="form" @submit="onLogin" :actions="false">
    <FormKit
      v-model="loginForm.email"
      type="text"
      label="Email"
      name="email"
      validation="email|required"
    ></FormKit>
    <FormKit
      v-model="loginForm.password"
      type="password"
      label="Password"
      name="password"
      validation="required"
    ></FormKit>
    <FormKit
      name="login"
      :label="!isLoading ? 'Login' : 'X'"
      :class="isLoading && 'animate-spin'"
      type="submit"
    ></FormKit>

    <FormKit @click="logout" name="logout" type="button">Logout</FormKit>
  </FormKit>
</template>

<script setup lang="ts">
const { login, logout } = useAuth()

const loginForm = reactive({ email: '', password: '' })
const { isLoading, executeAPI } = login(loginForm)
const onLogin = () => {
  executeAPI()
}
</script>

<style scoped></style>

import { useGet, usePost } from './instance'

export default {
  login: (data: any) => {
    /**
     *
     * @param { email, password}
     */
    return usePost({ url: '/auth/login/general', data, requiredToken: false })
  },

  signUp: (data: any) => {
    /**
     *
     * @param { email, first_name, last_name, password}
     */
    return usePost({ url: '/auth/signup', data, requiredToken: false })
  },
  changePwd: (data: any) => {
    /**
     *
     * @param { new_password, password}
     */
    return usePost({
      url: '/auth/change-pwd',
      data,
      requiredToken: true,
    })
  },
  getMe: () => {
    /**
     *
     * @param { }
     */
    return useGet({ url: '/auth/me', requiredToken: true })
  },
  forgotPwd: (data: any) => {
    /**
     *
     * @param { email }
     */
    return usePost({ url: '/auth/forgot-pwd', data, requiredToken: false })
  },
  resetPwd: (data: any, token: string) => {
    /**
     *
     * @param { new_password }
     */
    return usePost({
      url: '/auth/forgot-pwd/reset',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

import { createPinia, storeToRefs } from 'pinia'
import { type UserModule } from '@/types'
import useAuthStore from '@/stores/auth'
import { Router } from 'vue-router'

// Định nghĩa thêm các thẻ meta
declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean
    // must be declared by every route
    requiresAuth: boolean
  }
}

export const install: UserModule = ({ isClient, initialState, app, router }) => {
  const pinia = createPinia()
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.

  if (isClient) pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value
  // Phải luôn đảm bảo pinia được cài đặt trước để chạy được dòng ***

  navigationGuard(router)
}

const navigationGuard = (router: Router) => {
  const { getProfile } = useAuth()
  const { isLoggedIn } = useAccountStorage()
  const { account } = storeToRefs(useAuthStore()) // ***

  const { executeAPI } = getProfile()

  router.beforeEach((to, _, next) => {
    const requiresAuth = to.meta.requiresAuth

    // Kiểm tra Trang đó có ( Auth + Đã Login ) hay chưa -> Chuyển đến trang login
    // Nếu đã login thì cho vào bình thường qua hàm next
    if (!!requiresAuth === true && !isLoggedIn) {
      next({ path: '/login' })
    } else next()
    // Mỗi lần reload lại hoặc chuyển đến một trang nào đó
    // Nếu token tồn tại mà account trong Store chưa có thì gọi API để gọi API set Account vào Store
    if (isLoggedIn && account.value === null) {
      executeAPI()
    }
  })
}

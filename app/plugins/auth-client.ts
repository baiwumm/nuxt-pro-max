import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
  const authClient = createAuthClient({
    plugins: [
      usernameClient(),
    ],
  })
  return {
    provide: {
      authClient,
    },
  }
})

import { sentinelClient } from '@better-auth/infra/client'
import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    sentinelClient(),
  ],
})

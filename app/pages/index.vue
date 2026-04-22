<script lang="ts" setup>
const router = useRouter()

const { $authClient } = useNuxtApp()

const session = $authClient.useSession()

const loading = ref(false)

async function signOut() {
  loading.value = true
  await $authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/auth/sign-in')
      },
    },
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center flex-col gap-4">
    <div class="flex items-center gap-4">
      <ThemePicker />
      <UButton>{{ $t('pages.title') }}</UButton>
      <UAvatar
        :text="session?.data?.user?.name || session?.data?.user?.email[0]"
        :chip="{
          inset: true,
          position: 'bottom-right',
          color: 'success',
        }"
      />
      <UButton :loading @click="signOut">
        注销
      </UButton>
    </div>
  </div>
</template>

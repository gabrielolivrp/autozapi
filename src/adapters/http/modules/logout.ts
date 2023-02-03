import WhatsApp from '@/adapters/whatsapp'
import { Logout, LogoutOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const logout = wrapper<Logout, LogoutOutput>(async ({ instanceId }) => {
  const whatsApp = WhatsApp.getInstance()

  await whatsApp.logout(instanceId)

  return { ok: true }
})

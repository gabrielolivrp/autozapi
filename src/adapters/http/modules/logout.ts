import WhatsApp from '@/adapters/whatsapp'
import { Logout, LogoutOutput } from '@/core/whatsapp/types'

export async function logout({ instanceId }: Logout): Promise<LogoutOutput> {
  const whatsApp = WhatsApp.getInstance()

  await whatsApp.logout(instanceId)

  return { ok: true }
}

import WhatsApp from '@/adapters/whatsapp'
import { GetStatus, GetStatusOutput } from '@/core/whatsapp/types'

export async function status({
  instanceId,
}: GetStatus): Promise<GetStatusOutput> {
  const whatsApp = WhatsApp.getInstance()

  const status = await whatsApp.getWhatsAppStatus(instanceId)

  return { status }
}

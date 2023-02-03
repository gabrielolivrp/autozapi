import WhatsApp from '@/adapters/whatsapp'
import { GetStatus, GetStatusOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const status = wrapper<GetStatus, GetStatusOutput>(
  async ({ instanceId }) => {
    const whatsApp = WhatsApp.getInstance()

    const status = await whatsApp.getWhatsAppStatus(instanceId)

    return { status }
  }
)

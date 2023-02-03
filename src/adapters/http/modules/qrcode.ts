import WhatsApp from '@/adapters/whatsapp'
import { GetQrCode, GetQrCodeOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const qrcode = wrapper<GetQrCode, GetQrCodeOutput>(
  async ({ instanceId, type: type_ }) => {
    const whatsApp = WhatsApp.getInstance()

    // TODO: Verificar se o whatsapp não esta pareado
    const qrcode = await whatsApp.getQrCode(instanceId, type_)

    return { qrcode }
  }
)

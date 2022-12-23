import WhatsApp from '@/adapters/whatsapp'
import { GetQrCode, GetQrCodeOutput } from '@/core/whatsapp/types'

export async function qrcode({
  instanceId,
  type: type_,
}: GetQrCode): Promise<GetQrCodeOutput> {
  const whatsApp = WhatsApp.getInstance()

  // TODO: Verificar se o whatsapp não esta pareado
  const qrcode = await whatsApp.getQrCode(instanceId, type_)

  return { qrcode }
}

import {
  WhatsApp,
  ChatId,
  createInstance,
  getContacts,
  getAuthChallange,
  InstanceId,
  getWhatsAppStatus,
  logout,
  sendFileMessage,
  sendAudio,
  checkInjections,
  sendMessage,
  onMessage,
  injectApi,
} from 'autozap'

class Autozap {
  private onMessage: (instanceId: InstanceId, data: any) => void
  private whatsAppInstances: Record<InstanceId, WhatsApp | null> = {}

  public constructor(onMessage: (instanceId: InstanceId, data: any) => void) {
    this.onMessage = onMessage
  }

  public async getWhatsAppInstance(instanceId: InstanceId): Promise<WhatsApp> {
    if (!this.whatsAppInstances[instanceId]) {
      this.whatsAppInstances[instanceId] = await createInstance({
        id: instanceId,
      })

      onMessage(
        this.whatsAppInstances[instanceId]!,
        (data) => this.onMessage(instanceId, data),
        { type: 'chat', massages: 'received' }
      )
    }

    const instance = this.whatsAppInstances[instanceId]!
    const injected = await checkInjections(instance.page)
    if (!injected) {
      await injectApi(instance.page)
    }

    return this.whatsAppInstances[instanceId]!
  }

  public async getQrCode(instanceId: InstanceId, type_: 'base64' | 'urlCode') {
    const instance = await this.getWhatsAppInstance(instanceId)
    return getAuthChallange(instance, { type: type_ })
  }

  public async getWhatsAppStatus(instanceId: InstanceId) {
    const instance = await this.getWhatsAppInstance(instanceId)
    return getWhatsAppStatus(instance)
  }

  public async getContacts(instanceId: InstanceId) {
    const instance = await this.getWhatsAppInstance(instanceId)
    return getContacts(instance)
  }

  public async sendMessage(instanceId: InstanceId, to: ChatId, text: string) {
    const instance = await this.getWhatsAppInstance(instanceId)
    return sendMessage(instance, to, {
      text,
    })
  }

  public async sendFileMessage(
    instanceId: InstanceId,
    to: ChatId,
    base64: string
  ) {
    const instance = await this.getWhatsAppInstance(instanceId)
    return sendFileMessage(instance, to, base64)
  }

  public async sendAudio(instanceId: InstanceId, to: ChatId, base64: string) {
    const instance = await this.getWhatsAppInstance(instanceId)
    return sendAudio(instance, to, base64)
  }

  public async logout(instanceId: InstanceId) {
    const instance = await this.getWhatsAppInstance(instanceId)
    this.whatsAppInstances[instanceId] = null
    return logout(instance)
  }
}

export default Autozap

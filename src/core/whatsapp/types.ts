export type GetQrCode = {
  instanceId: string
  type: 'base64' | 'urlCode'
}

export type GetQrCodeOutput = {
  qrcode: string | undefined
}

export type GetStatus = {
  instanceId: string
}

export type GetStatusOutput = {
  status: string
}

export type SendText = {
  instanceId: string
  chatId: string
  text: string
}

export type SendTextOutput = {
  ok: boolean
}

export type SendImage = {
  instanceId: string
  chatId: string
  base64: string
}

export type SendImageOutput = {
  ok: boolean
}

export type SendAudio = {
  instanceId: string
  chatId: string
  base64: string
}

export type SendAudioOutput = {
  ok: boolean
}

export type Logout = {
  instanceId: string
  chatId: string
  base64: string
}

export type LogoutOutput = {
  ok: boolean
}

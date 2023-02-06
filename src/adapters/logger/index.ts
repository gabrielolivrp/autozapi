import Winston, { Level } from '@/ports/winston'

class Logger {
  private static instance: Logger
  private logger: Winston

  private constructor() {
    this.logger = new Winston()
  }

  public log(level: Level, message: string) {
    return this.logger.log(level, message)
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }

    return Logger.instance
  }

  public static log(level: Level, message: string) {
    return Logger.getInstance().log(level, message)
  }
}

export default Logger

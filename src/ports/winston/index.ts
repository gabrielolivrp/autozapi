import fs from 'fs'
import winston from 'winston'

export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'critical' | 'fatal'

const colors = {
  fatal: 'red',
  info: 'green',
  trace: 'white',
  debug: 'green',
  warn: 'yellow',
  critical: 'red',
} as { [k in Level]: string }

const levels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  critical: 4,
  fatal: 5,
} as { [k in Level]: number }

class Winston {
  private logger: winston.Logger

  public constructor() {
    winston.addColors(colors)

    // check if directory exist
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs')
    }

    this.logger = winston.createLogger({
      levels,
      transports: [
        new winston.transports.File({
          level: 'fatal',
          filename: `./logs/${new Date().toISOString().slice(0, 10)}.log`,
        }),
      ],
    })
  }

  public log(level: Level, message: string) {
    const objType = Object.prototype.toString.call(message)
    if (objType === '[object Error]') {
      this.logger.log.call(this.logger, level, message.toString())
    } else {
      this.logger.log.call(this.logger, level, message)
    }
  }
}

export default Winston

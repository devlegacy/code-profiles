import pino from "pino";
import type { Level } from 'pino'

type LogLevel = Extract<Level, 'info' | 'warn' | 'error'>

type ILogger = {
  [K in LogLevel]: (kind: string, obj: Record<string, unknown>, message?: string) => void
}

const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
    { target: 'some-file-transport', options: { destination: '/dev/null' },
  ],
})

const baseLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: false
    }
  }
})

const convertLogObject = (kind: string, obj: Record<string, unknown>) => {
  return {
    kind,
    ...obj
  }
}

export const logger = ((): ILogger => {

  return {
    info: (kind, obj, message) => {
      baseLogger.info(
        convertLogObject(kind, obj),
        message,
      )
    },
    warn: (kind, obj, message) => {
      baseLogger.warn(
        convertLogObject(kind, obj),
        message,
      )
    },
    error: (kind, obj, message) => {
      baseLogger.error(
        convertLogObject(kind, obj),
        message,
      )
    }
  }
})();

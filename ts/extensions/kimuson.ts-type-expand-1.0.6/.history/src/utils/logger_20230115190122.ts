import pino from "pino"
import type { Level } from "pino"

type LogLevel = Pick<Level, "info" | "warn" | "error">

type ILogger = {
  [K in LogLevel]: () => void
}

export const logger = (() => {
  const baseLogger = pino({
    transport: {
      target: "pino-pretty",
    },
  })

  baseLogger

  return {}
})()

logger.info()

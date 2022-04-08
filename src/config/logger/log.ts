import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint, printf, align, colorize } = format;

const levels = {
    emerg: 0,
    http: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7,
    alert: 8
}

const skipper = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const transportsOptions = [
    new transports.File({
        filename: `${process.cwd()}/_logs/http.log`,
        level: 'http',
        format: combine(timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), prettyPrint(), align(), format.json())
    }),
    new transports.File({
        filename: `${process.cwd()}/_logs/error.log`,
        level: 'error',
        format: combine(timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), prettyPrint(), align(), format.json())
    }),
    new transports.Console({
        level: 'info',
        format: combine(
            label({ label: '[LOGGER-info]' }),
            timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
            prettyPrint(),
            align(),
            colorize({all:true}),
            format.json(),
            printf((info) => `[LOGGER-${info.timestamp}] ${info.level}: ${info.message}`)
        )
    }),
]

const exceptionHandlersOptions = [new transports.File({ filename: `${process.cwd()}/_logs/exceptions.log` })]

const Logger = createLogger({
    level: skipper(),
    levels,
    transports: transportsOptions,
    exceptionHandlers: exceptionHandlersOptions,
    exitOnError: false,
})



export default Logger


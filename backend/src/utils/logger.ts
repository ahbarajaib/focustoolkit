enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

class Logger {
    private logLevel: LogLevel;

    constructor(logLevel: LogLevel = LogLevel.INFO) {
        this.logLevel = logLevel;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = Object.values(LogLevel);
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    private log(level: LogLevel, message: string, ...optionalParams: any[]): void {
        if (this.shouldLog(level)) {
            console[level](message, ...optionalParams);
        }
    }

    debug(message: string, ...optionalParams: any[]): void {
        this.log(LogLevel.DEBUG, message, ...optionalParams);
    }

    info(message: string, ...optionalParams: any[]): void {
        this.log(LogLevel.INFO, message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]): void {
        this.log(LogLevel.WARN, message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]): void {
        this.log(LogLevel.ERROR, message, ...optionalParams);
    }
}

export { Logger, LogLevel };
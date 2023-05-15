import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as chalk from 'chalk';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

export const logger = (configService: ConfigService): LoggerService =>
{
    return WinstonModule.createLogger({
        level : 'info',
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.File({
                filename: configService.get<string>('LOGGER_BASE_PATH') + '/error.log',
                level   : 'error',
                maxsize : 5242880,
                maxFiles: 5,
                format  : winston.format.combine(
                    winston.format.timestamp({
                        format: 'DD/MM/YYYY HH:mm:ss',
                    }),
                    winston.format.label({ label: 'LOG' }),
                    winston.format.simple(),
                    winston.format.printf(({ level, message, label, timestamp, context }) =>
                    {
                        return `${timestamp}   ${label} [${context}] ${message}`;
                    }),
                ),
            }),
            new winston.transports.File({
                filename: configService.get<string>('LOGGER_BASE_PATH') + '/console.log',
                maxsize : 5242880,
                maxFiles: 5,
                format  : winston.format.combine(
                    winston.format.timestamp({
                        format: 'DD/MM/YYYY HH:mm:ss',
                    }),
                    winston.format.label({ label: 'LOG' }),
                    winston.format.simple(),
                    winston.format.printf(({ level, message, label, timestamp, context }) =>
                    {
                        return `${timestamp}   ${label} [${context}] ${message}`;
                    }),
                ),
            }),
            new winston.transports.Console({
                level : 'info',
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                    }),
                    winston.format.timestamp({
                        format: 'DD/MM/YYYY HH:mm:ss',
                    }),
                    winston.format.label({ label: 'LOG' }),
                    winston.format.simple(),
                    winston.format.printf(({ level, message, label, timestamp, context }) =>
                    {
                        return chalk`${timestamp}   {keyword('green') ${label}} {keyword('yellow') [${context}]} ${message}`;
                    }),
                ),
            }),
        ],
    });
};


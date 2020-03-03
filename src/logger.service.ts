import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { isObject, isString } from '@nestjs/common/utils/shared.utils';
import * as pino from 'pino';
import { PinoLoggerConfig } from './logger.config';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  private logger: pino.Logger;

  constructor(options: PinoLoggerConfig = new PinoLoggerConfig()) {
    this.logger = pino(options.get());
  }
  setLabels(context: object) {
    this.logger = this.logger.child({...context})
  }
  info(msg: any, context?: string, ...args: any[]) {
    if(context) {
      this.logger.child({context}).info(msg, ...args);
      return;
    }
    this.logger.info(msg, ...args);
  }
  log(msg: any, context?: string, ...args: any[]) {
    if(context) {
      this.logger.child({context}).info(msg, ...args);
      return;
    }
    this.logger.info(msg, ...args);
  }

  error(msg: any, trace?: string, context?: string, ...args: any[]) {

    this.logger.error(
      {
        msg: isString(msg) ? msg : 'Error',
        ...(isObject(msg) ? msg : {}),
        trace,
      },
      ...args,
    );
  }

  warn(msg: any, context?: string, ...args: any[]) {
    if(context) {
      this.logger.child({context}).warn(msg, ...args);
      return;
    }
    this.logger.warn(msg, ...args);
  }

  debug(msg: any, context?: string, ...args: any[]) {
    if(context) {
      this.logger.child({context}).debug(msg, ...args);
      return;
    }
    this.logger.debug(msg, context, ...args);
  }

  verbose(msg: any, context?: string, ...args: any[]) {
    if(context) {
      this.logger.child({context}).verbose(msg, ...args);
      return;
    }
    this.logger.verbose(msg, context, ...args);
  }
}

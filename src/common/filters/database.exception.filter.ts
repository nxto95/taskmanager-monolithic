import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

interface DatabaseDriverError {
  code?: string;
  constraint?: string;
}

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.error(`queryFailedError: [${request.method}:${request.url}]`);
    const driverError = exception.driverError as unknown as DatabaseDriverError;
    const code = driverError?.code;
    const constraint = driverError?.constraint;

    if (code === '23505') {
      return response.status(409).json({
        message: constraint,
      });
    }
    this.logger.error(`Unhandled database error: ${code}`, exception.stack);
    return response.status(500).json({
      message: 'unknown database error',
    });
  }
}

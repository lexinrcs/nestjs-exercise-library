import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common"


@Catch(NotFoundException)
export class BookNotFound implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: 'Book not found in the database.',
    });
  }
}
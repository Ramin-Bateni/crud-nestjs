// src/presentation/http/filters/mongo-duplicate-key.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { MongoServerError } from "mongodb";

@Catch(MongoServerError)
export class MongoDuplicateKeyFilter implements ExceptionFilter {
  /* Map Mongo duplicate key (E11000) to HTTP 409 Conflict */
  catch(error: MongoServerError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (error.code === 11000) {
      /* Build standard NestJS error body */
      res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: "duplicate customer",
        error: "Conflict",
      });
      return;
    }

    /* Let other Mongo errors bubble up */
    throw error;
  }
}

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
  /* Map any duplicate key (E11000) to HTTP 409 Conflict with contextual message */
  catch(error: MongoServerError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (error.code === 11000) {
      /* Detect which unique index failed */
      const indexName = this.extractIndexName(error.message);
      const message =
        indexName === "unique-email_idx" || indexName === "email_1"
          ? "Duplicate Email"
          : "Duplicate First name, Last name and Date of birth";

      res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message,
        error: "Conflict",
        /* optional: duplicate value for debugging */
        // details: error.keyValue,
      });
      return;
    }

    /* Unknown Mongo error → propagate */
    throw error;
  }

  /* Parse index name from error.message */
  private extractIndexName(msg: string): string | null {
    /* Example: E11000 duplicate key error collection: db.customers index: unique-email_idx dup key: { email: "foo@bar.com" } */
    const match = msg.match(/index:\s+([^\s]+)\s/);
    return match ? match[1] : null;
  }
}

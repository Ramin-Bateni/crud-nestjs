import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, type Type } from '@nestjs/common';

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(options: {
  type: TModel;
  description?: string;
}): MethodDecorator => {
  const status = 200;
  const description = options.description ?? 'Paginated response';

  return applyDecorators(
    ApiExtraModels(options.type),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                description: 'the array of the results returned',
                items: { $ref: getSchemaPath(options.type) },
              },
              total: {
                type: 'integer',
                description:
                  'total number of results matching provided filters',
                example: 10,
              },
              skip: {
                type: 'integer',
                description:
                  'the number of results to be skipped in input filter',
                example: 0,
              },
              take: {
                type: 'integer',
                description:
                  'the number of results to be taken in input filter',
                example: 10,
              },
            },
          },
        ],
      },
    }),
  );
};

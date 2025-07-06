import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @ApiOperation({
    summary: 'gets a simple response if the app is running',
  })
  @ApiOkResponse({
    description: 'returns a simple response',
  })
  @Get()
  public ping() {
    return {
      ping: 'pong',
    };
  }
}

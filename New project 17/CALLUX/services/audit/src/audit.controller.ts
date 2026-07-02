import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@callux/common/jwt.guard';

@Controller('v1/audit')
export class AuditController {
  @UseGuards(JwtAuthGuard)
  @Get('calls/:id')
  getCallAudit(@Param('id') id: string) {
    return { callId: id, events: [] };
  }
}


import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@callux/common/jwt.guard';

@Controller('v1/pod')
export class PodController {
  @UseGuards(JwtAuthGuard)
  @Post(':callId/artifacts')
  createArtifact(@Param('callId') callId: string, @Body() body: { artifactType: string; sha256: string }) {
    return { callId, status: 'RECEIVED', artifactType: body.artifactType, sha256: body.sha256 };
  }
}


import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@callux/common/jwt.guard';
import { DispatchService } from './dispatch.service';

@Controller('v1/dispatch')
export class DispatchController {
  constructor(private readonly svc: DispatchService) {}

  @UseGuards(JwtAuthGuard)
  @Get('offers')
  listOffers() {
    return this.svc.listOffersForDriver();
  }

  @UseGuards(JwtAuthGuard)
  @Post('offers/:id/accept')
  accept(@Param('id') id: string) {
    return this.svc.acceptOffer(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('offers/:id/decline')
  decline(@Param('id') id: string) {
    return this.svc.declineOffer(id);
  }
}


import { Controller, Get } from '@nestjs/common';
import { ConceitosAutomaticoService } from './conceitos-automatico.service';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {
  constructor(
    private readonly conceitoAutomaticoService: ConceitosAutomaticoService,
  ) {}

  @Get()
  home(): string {
    return this.conceitoAutomaticoService.exemploService();
  }
}

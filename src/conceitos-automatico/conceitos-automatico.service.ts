import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
    exemploService(): string {
        return 'Utilizando o service conceito automatico'
    }
}

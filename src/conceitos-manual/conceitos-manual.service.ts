import { Injectable } from "@nestjs/common";


@Injectable()
export class ConceitosManualService {
    exemploService(): string {
        return 'Utilizando o service conceito manual'
    }

}
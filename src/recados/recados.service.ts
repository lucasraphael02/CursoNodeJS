import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];
  throwNotFoundError() {
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado.');
  }
  findAll() {
    return this.recados;
  }
  findOne(id: number) {
    const recado = this.recados.find(item => item.id === id);
    if (recado) return recado;
    this.throwNotFoundError();
  }
  create(createRecadoDTO: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;

    const novoRecado = {
      id,
      ...createRecadoDTO,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);

    return novoRecado;
  }
  update(id: number, updateRecadoDTO: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === id);
    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const recadoExistente = this.recados[recadoExistenteIndex];

    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...updateRecadoDTO,
    };
    return this.recados[recadoExistenteIndex];
  }

  remove(id: number) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === id);
    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }
    const recado = this.recados[recadoExistenteIndex];
    this.recados.splice(recadoExistenteIndex, 1);
    return recado;
  }
}

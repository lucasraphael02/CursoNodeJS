import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
  ) {}
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

  async findAll() {
    const recados = await this.recadosRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: {
        id: id,
      },
    });
    if (recado) return recado;
    this.throwNotFoundError();
  }

  async create(createRecadoDTO: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDTO,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadosRepository.create(novoRecado);
    return this.recadosRepository.save(recado);
  }

  async update(id: number, updateRecadoDTO: UpdateRecadoDto) {
    const partialRecado = {
      lido: updateRecadoDTO?.lido,
      texto: updateRecadoDTO?.texto,
    };
    const recado = await this.recadosRepository.preload({
      id,
      ...partialRecado,
    });
    if (!recado) return this.throwNotFoundError();
    return this.recadosRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!recado) return this.throwNotFoundError();
    return this.recadosRepository.remove(recado);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  throwNotFoundError() {
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado.');
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const recados = await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: { id: 'desc' },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: {
        id: id,
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado.');
    }
    return recado;
  }

  async create(createRecadoDTO: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDTO;

    const de = await this.pessoasService.findOne(deId);

    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDTO.texto,
      de: de,
      para: para,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadosRepository.create(novoRecado);
    this.recadosRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDTO: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    recado.texto = updateRecadoDTO?.texto ?? recado?.texto;
    recado.lido = updateRecadoDTO?.lido ?? recado?.lido;

    await this.recadosRepository.save(recado);
    return recado;
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

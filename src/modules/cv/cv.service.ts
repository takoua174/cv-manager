import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, IsNull, FindManyOptions } from 'typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { PaginationDto } from '../pagination/dtos/pagination.dto';
import { PaginatedResult } from '../../interfaces/paginated-result.interface';

@Injectable()
export class CvService extends GenericService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }

  async createWithUser(createCvDto: CreateCvDto, user: any): Promise<Cv> {
    const cvData: DeepPartial<Cv> = {
      ...createCvDto,
      user: { id: user.userId },
    };
    const cv = this.cvRepository.create(cvData);
    return this.cvRepository.save(cv);
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['user', 'skills'],
    });
    if (!cv) {
      throw new Error(`CV with id ${id} not found`); 
    }
      return cv;
  }

  async findByUser(userId: number): Promise<Cv[]> {
    return this.cvRepository.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      relations: ['skills'],
    });
  }

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['user', 'skills'],
    });
  }

  async paginateByUser(
    userId: number,
    paginationDto: PaginationDto,
    isAdmin: boolean = false
  ): Promise<PaginatedResult<Cv>> {
    const options: FindManyOptions<Cv> = {
      where: { deletedAt: IsNull() },
      relations: ['user', 'skills'],
    };

    if (!isAdmin) {
      options.where = { ...options.where, user: { id: userId } };
    }

    const [data, total] = await this.cvRepository.findAndCount({
      ...options,
      take: paginationDto.limit,
      skip: (paginationDto.page - 1) * paginationDto.limit,
    });

    const lastPage = Math.ceil(total / paginationDto.limit);

    return {
      data,
      total,
      page: paginationDto.page,
      limit: paginationDto.limit,
      lastPage,
    };
  }

  async updateImagePath(id: number, imagePath: string): Promise<Cv> {
    await this.cvRepository.update(id, { path: imagePath });
    return this.findOne(id);
  }
}
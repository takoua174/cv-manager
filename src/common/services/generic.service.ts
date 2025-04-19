import {
  IsNull,
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../entities/baseEntity';
import { PaginationDto } from '../dto/paginationDto';

export class GenericService<T extends BaseEntity> {
  constructor(private repository: Repository<T>) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<{ data: T[]; total: number }> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: { deletedAt: IsNull() } as any,
      skip,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number, options?: FindManyOptions<T>): Promise<T> {
    const entity = await this.repository.findOne({
      ...options,
      where: {
        id,
        ...options?.where,
        deletedAt: IsNull(),
      } as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    await this.findOne(id);
    const updatedData = {
      ...updateDto,
      updatedAt: new Date(),
    };
    await this.repository.update(id, updatedData as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.deletedAt = new Date();
    await this.repository.save(entity);
  }
}

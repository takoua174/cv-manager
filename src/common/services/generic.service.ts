import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class GenericService<T extends Record<string, any>> {
  // T entité générique définie par une contrainte pour que T est un objet
  constructor(private repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    //{ where: { id } } : objet de configuration
    // as any ala pb de typage mte3 typescript
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async create(createDto: any): Promise<T[]> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: any): Promise<T> {
    await this.findOne(id); // Vérifie si l'entité existe
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
  }
}

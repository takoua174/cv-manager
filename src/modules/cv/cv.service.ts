import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, IsNull } from 'typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';

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
    return super.findOne(id, { relations: ['user'] });
  }

  async findByUser(userId: number): Promise<Cv[]> {
    return this.cvRepository.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
    });
  }
}
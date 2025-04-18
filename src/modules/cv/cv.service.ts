import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Cv } from '../../modules/cv/entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService extends GenericService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }

  async findAll(userId?: number): Promise<Cv[]> {
    if (userId) {
      return this.cvRepository.find({ 
        where: { user: { id: userId } },
        relations: ['user']
      });
    }
    return super.findAll();
  }

  // Add other user-specific methods as needed
}
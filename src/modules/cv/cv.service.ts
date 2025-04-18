import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Cv } from '../../modules/cv/entities/cv.entity';
import { Repository } from 'typeorm';
//hadha ymarki el class as provider
@Injectable()
export class CvService extends GenericService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }

  async findByUser(userId: number): Promise<Cv[]> {
    return this.cvRepository.find({ where: { user: { id: userId } } });
  }
}

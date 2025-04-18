import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { AuthService } from '../auth/auth.service';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService, private readonly authService: AuthService,) {}


  private async validateUser(req: any): Promise<any> {
    const authHeader = req.headers['auth-user'];
    if (!authHeader) {
      throw new ForbiddenException('No token provided');
    }

    try {
      return await this.authService.verifyToken(authHeader);
    } catch (e) {
      throw new ForbiddenException('Invalid token');
    }
  }

  @Post()
  async create(@Body() createCvDto: CreateCvDto , @Req() req) {
    const user = await this.validateUser(req);
    return this.cvService.create(createCvDto);
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.validateUser(req);
    return this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.validateUser(req);
    const cv = await this.cvService.findOne(+id);
    
    if (user.role !== 'admin' && cv.user.id !== user.sub) {
      throw new ForbiddenException();
    }
    return cv;
  }

 @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @Req() req) {
    const user = await this.validateUser(req);
    const cv = await this.cvService.findOne(+id);
    
    if (user.role !== 'admin' && cv.user.id !== user.sub) {
      throw new ForbiddenException();
    }
    return this.cvService.update(+id, updateCvDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}

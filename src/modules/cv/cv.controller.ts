import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtUser } from '../auth/decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('cv')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCvDto: CreateCvDto, @JwtUser() user) {
    return this.cvService.createWithUser(createCvDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
 
  async findAll(@JwtUser() user) {
    if (user.role !== 'admin') {
      return this.cvService.findByUser(user.userId);
    }
    return this.cvService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @JwtUser() user) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only view your own CV');
    }
    return cv;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @JwtUser() user) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only update your own CV');
    }
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @JwtUser() user) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only delete your own CV');
    }
    return this.cvService.remove(+id);
  }
}
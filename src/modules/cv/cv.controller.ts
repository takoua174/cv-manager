import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtUser } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../pagination/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadCvImageDto } from './dto/upload-cv-image.dto';

@Controller('cv')
@UseGuards(AuthGuard('jwt'))
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @Roles('user', 'admin')
  async create(@Body() createCvDto: CreateCvDto, @JwtUser() user) {
    return this.cvService.createWithUser(createCvDto, user);
  }

  @Get()
  @Roles('admin')
  async findAll(
    @Query() paginationDto: PaginationDto,
    @JwtUser() user
  ) {
    return this.cvService.paginateByUser(
      user.userId,
      paginationDto,
      user.role === 'admin'
    );
  }

  @Get("cv")
  async findAll2(
    @JwtUser() user
  ) {
    if (user.role !== 'admin') {
      return this.cvService.findByUser(user.userId);
    }
    return this.cvService.findAll(
);
  }

  

  @Get(':id')
  async findOne(@Param('id') id: string, @JwtUser() user) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only view your own CV');
    }
    return cv;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @JwtUser() user
  ) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only update your own CV');
    }
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  @Roles('user', 'admin')
  async remove(@Param('id') id: string, @JwtUser() user) {
    const cv = await this.cvService.findOne(+id);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only delete your own CV');
    }
    return this.cvService.remove(+id);
  }

  @Post('upload-image')
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCvImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadCvImageDto: UploadCvImageDto,
    @JwtUser() user
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const cv = await this.cvService.findOne(uploadCvImageDto.cvId);
    if (user.role !== 'admin' && cv.user.id !== user.userId) {
      throw new ForbiddenException('You can only upload images for your own CV');
    }

    return this.cvService.updateImagePath(
      uploadCvImageDto.cvId,
      `/uploads/cvs/${file.filename}`
    );
  }
}
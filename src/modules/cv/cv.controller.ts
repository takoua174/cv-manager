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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtUser } from '../auth/decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { cvImageUploadConfig } from 'src/config/multer.config';

@Controller('cv')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CvController {
  constructor(
    private readonly cvService: CvService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCvDto: CreateCvDto, @JwtUser() user) {
    console.log('Request user:', user);
    return this.cvService.createWithUser(createCvDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  // using the @query is a solution and using a custom decorator (@Pagination) is another solution
  async findAll(@JwtUser() user, @Query() pagination: PaginationDto) {
    if (user.role !== 'admin') {
      // You might want to add pagination to findByUser as well
      return this.cvService.findByUser(user.userId);
    }
    return this.cvService.findAll(pagination);
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
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @JwtUser() user,
  ) {
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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', cvImageUploadConfig))
  async uploadCvImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        'Fichier non valide ou taille dépassant 1Mo',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Fichier téléchargé avec succès',
      filename: file.filename,
      path: `/public/uploads/cv-images/${file.filename}`,
      url: `http://localhost:3000/public/uploads/cv-images/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}

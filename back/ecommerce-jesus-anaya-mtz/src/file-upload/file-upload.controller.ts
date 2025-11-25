import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload Image')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @ApiBearerAuth()
  @Post('uploadImage/:id')
  @ApiParam({
    name: 'id',
    description: 'El UUID del product que se desea agregar imagen.',
    example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d',
  })
  @ApiConsumes('multipart/form-data')

  @ApiBody({
    description: 'Archivo de imagen a subir (JPG, JPEG, PNG), tamaño máximo 200kb.',
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: 'El tamaño maximo de la imagen es de 200 kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const result = await this.fileUploadService.uploadProductImage(file, id);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error uploading image',
      };
    }
  }
}

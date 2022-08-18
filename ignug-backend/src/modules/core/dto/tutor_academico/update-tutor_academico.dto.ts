/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateTutorAcademicoDto } from './create-tutor_academico.dto';

export class UpdateTutorAcademicoDto extends PartialType(
  CreateTutorAcademicoDto,
) {}

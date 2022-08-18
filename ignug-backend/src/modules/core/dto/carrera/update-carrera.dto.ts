/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCarreraDto } from './create-carrera.dto';

export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {}

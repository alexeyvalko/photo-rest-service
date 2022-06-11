import { PartialType } from '@nestjs/mapped-types';
import { CreateLatestDto } from './create-latest.dto';

export class UpdateLatestDto extends PartialType(CreateLatestDto) {}

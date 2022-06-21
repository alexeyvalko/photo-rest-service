import { ApiProperty } from '@nestjs/swagger';
export class DownloadLInkDto {
  @ApiProperty()
  downloadLocation: string;
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uuidFormat',
  standalone: true,
})
export class UuidFormatPipe implements PipeTransform {
  transform(
    uuid: string | null | undefined,
    format: 'short' | 'medium' | 'full' = 'short'
  ): string {
    if (!uuid) return 'N/A';

    switch (format) {
      case 'short':
        // Show first 8 characters + ...
        return uuid.length > 8 ? `${uuid.substring(0, 8)}...` : uuid;
      case 'medium':
        // Show first 8 + last 4 characters
        return uuid.length > 12
          ? `${uuid.substring(0, 8)}...${uuid.substring(uuid.length - 4)}`
          : uuid;
      case 'full':
      default:
        return uuid;
    }
  }
}

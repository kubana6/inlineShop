import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'imageUrl',
})
export class ImagePipe implements PipeTransform {
  transform(value: any) {
    return `url${value}`;
  }
}

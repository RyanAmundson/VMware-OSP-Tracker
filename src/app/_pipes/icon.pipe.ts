import { Pipe, PipeTransform } from '@angular/core';
import IconMap from '../../assets/icon-map.json';


@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  
  transform(value: any, ...args: any[]): any {
    return IconMap[value.toLowerCase()];
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import IconMap from '../../assets/icon-map.json';


@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  
  transform(value: any, ...args: any[]): any {
    if(IconMap.i[value.toLowerCase()]) {
      return `<i class='${IconMap.i[value.toLowerCase()]}'></i>`;
    } else if(IconMap.src[value.toLowerCase()]) {
      return `<img src='${IconMap.src[value.toLowerCase()]}'>`; 
    } else {
      console.debug("No icon found in map for: ", value);
      return null;
    }
  }

}

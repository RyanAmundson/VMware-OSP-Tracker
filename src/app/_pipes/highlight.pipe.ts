import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  pure:true
})
export class HighlightPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {

  }


  transform(value: Observable<any>, ...args: any[]): any {
    let searchTerm = args[0];
    return value.pipe(
      map((list) => this.hightlight(list, searchTerm)),
    );
  }

  hightlight(list, searchTerm) {
    if(searchTerm.length >= 2) {

      let highlightedList = list.map((item, index) => {
        let stringifiedItem = JSON.stringify(item);
        this.domSanitizer.sanitize(SecurityContext.HTML, stringifiedItem);
        stringifiedItem = stringifiedItem.replace(searchTerm, '<mark>' + searchTerm + '</mark>');
        return JSON.parse(stringifiedItem);
      });
      return highlightedList;
    } else {
      return list;
    }
  }

}

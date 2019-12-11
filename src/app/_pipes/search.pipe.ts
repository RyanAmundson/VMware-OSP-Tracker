import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {

  }

  transform(value: Observable<any>, ...args: any[]): Observable<any> {
    console.log(args)
    let searchTerm = args[0];
    args.shift();
    let priorityKeys = args;
    console.log(searchTerm, priorityKeys, args);
    if (searchTerm === null || searchTerm === '' || searchTerm === undefined) return value;
    return value.pipe(
      debounceTime(5000),
      map((list) => this.search(list, searchTerm, priorityKeys)),
      // map((list) => this.hightlight(list, searchTerm)),
      distinctUntilChanged(),
    );
  }

  search(list, searchTerm, priorityKeys) { // use regex for case matching
    return list.filter((listItem) => {
      if (priorityKeys && priorityKeys.length > 0) {
        let finds = priorityKeys.filter(key => {
          return list[key].indexOf(searchTerm) > -1;
        });
        return finds.length > 0;
      } else {
        console.log(JSON.stringify(listItem).indexOf(searchTerm) > -1)
        return JSON.stringify(listItem).indexOf(searchTerm) > -1;
      }
    });
  }

  hightlight(list, searchTerm) {
    let highlightedList = list.map((item, index) => {
      let stringifiedItem = JSON.stringify(item);
      this.domSanitizer.sanitize(SecurityContext.HTML, stringifiedItem);
      stringifiedItem = stringifiedItem.replace(searchTerm, '<mark>' + searchTerm + '</mark>');
      return JSON.parse(stringifiedItem);
    });
    return highlightedList;
  }

}

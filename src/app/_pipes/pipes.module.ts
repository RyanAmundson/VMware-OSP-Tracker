import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../_pipes/search.pipe';
import { FilterPipe } from '../_pipes/filter.pipe';
import { SafePipe } from './safe.pipe';
import { IconPipe } from './icon.pipe';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    SearchPipe,
    SafePipe,
    IconPipe,
    HighlightPipe
  ],
  imports: [
    CommonModule,
  ],
  providers: [
  ],
  exports: [
      FilterPipe,
      SearchPipe,
      SafePipe,
      IconPipe,
      HighlightPipe
  ]
})
export class PipesModule { }

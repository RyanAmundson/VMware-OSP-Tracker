import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../_pipes/search.pipe';
import { FilterPipe } from '../_pipes/filter.pipe';
import { SafePipe } from './safe.pipe';
import { IconPipe } from './icon.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    SearchPipe,
    SafePipe,
    IconPipe
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
      IconPipe
  ]
})
export class PipesModule { }

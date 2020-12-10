import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { HelpComponent } from './help/help.component';
import { SortAscendingPipe } from './sort-ascending.pipe';
import { AllMaterialModule } from './material-module';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    HelpComponent,
    SortAscendingPipe
  ],
  imports: [
    CommonModule,
    AllMaterialModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    HelpComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    SortAscendingPipe,
    AllMaterialModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}

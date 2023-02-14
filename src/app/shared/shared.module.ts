import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableHeaderComponent} from './table-header/table-header.component';
import {ActionButtonComponent} from './action-button/action-button.component';
import {TablePagerComponent} from './table-pager/table-pager.component';
import {DialogComponent} from './dialog/dialog.component';
import { TextInputComponent } from './text-input/text-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TextAreaComponent } from './text-area/text-area.component';
import { TabComponent } from './tab/tab.component';
import { TextSelectComponent } from './text-select/text-select.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { FileSelectComponent } from './file-select/file-select.component';

@NgModule({
  declarations: [
    TableHeaderComponent, ActionButtonComponent, TablePagerComponent, DialogComponent, TextInputComponent, TextAreaComponent, TabComponent, TextSelectComponent, FileSelectComponent
  ],
    exports: [
        TableHeaderComponent, ActionButtonComponent, TablePagerComponent, DialogComponent, TextInputComponent, TextAreaComponent, TabComponent, TextSelectComponent, FileSelectComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule]
})
export class SharedModule {
}

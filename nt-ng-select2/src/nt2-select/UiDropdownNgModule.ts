import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UiDropdownComponent} from './UiDropdownComponent';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    exports: [UiDropdownComponent],
    declarations: [UiDropdownComponent]
})
export class UiDropdownNgModule {

}
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {UiDropdownNgModule} from './nt2-select/UiDropdownNgModule';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
    imports: [BrowserModule, UiDropdownNgModule, ReactiveFormsModule],
    exports: [UiDropdownNgModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}
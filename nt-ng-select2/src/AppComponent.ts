import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
@Component({
    selector: 'nt-root-app',
    template: '<div [formGroup]="fg"><vmr-ui-dropdown formControlName="ctrl"></vmr-ui-dropdown></div>'
})
export class AppComponent {

    private fg: FormGroup;

    constructor(private fb: FormBuilder) {
        this.fg = fb.group({
            ctrl: new FormControl()
        })
    }
}
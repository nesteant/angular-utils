import {
    Component,
    AfterViewInit,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    Input,
    ElementRef,
    forwardRef,
    Injector,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, AbstractControl} from '@angular/forms';
import {Subject, BehaviorSubject} from 'rxjs';
import {DropdownDefinition} from './DropdownDefinition';
import {DropdownItem} from './DropdownItem';

require('select2');

@Component({
    selector: 'vmr-ui-dropdown',
    template: require('./ui-dropdown.html'),
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UiDropdownComponent),
            multi: true
        }
    ],
    styles: [require('./ui-dropdown.less')],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiDropdownComponent<T> implements AfterViewInit, OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    private control: AbstractControl;
    private submitChange: (value: T) => void;

    @ViewChild('selectElement')
    private selectElement: ElementRef;

    @Input()
    private definition: DropdownDefinition<T>;

    @Input()
    private placeholder: string = 'Select ...';

    @Input()
    private set options(opts: T[]) {
        console.log('OPTS', opts);
        this.optionsSubject.next(opts);
    }

    private valueWrittenSubject: Subject<T> = new BehaviorSubject(null);
    private optionsSubject: Subject<T[]> = new BehaviorSubject(null);

    constructor(private injector: Injector) {
    }

    public ngAfterViewInit(): void {
        const rootElement = <Select2> $(this.selectElement.nativeElement);
        rootElement
            .select2({
                placeholder: 'Select ...' || this.placeholder,
                minimumResultsForSearch: Infinity,
                data: [{id: 1, text: 'VAL'}]
            })
            .val('-1')
            .on('change', (event: Event, eventData: ChangeEventData) => {
                if (!eventData || eventData.propagateChanges) {
                    const value = this.getCurrentSelectOpts(rootElement)
                        .find((opt: DropdownItem) => opt.id === rootElement.val());
                    this.submitChange(value);

                    console.log('SHOULD CHANGE', rootElement.val(), value);
                }
            })
            .trigger('change', {propagateChanges: false});

        this.optionsSubject.subscribe(opts => {
            rootElement.empty();
            rootElement
                .select2({
                    placeholder: 'Select ...' || this.placeholder,
                    minimumResultsForSearch: Infinity,
                    data: this.convertToSelect2Options(opts)
                })
                //TODO:nesteant: check whether it was in old options
                .val('-1')
                .trigger('change', {propagateChanges: false});
        });

        this.valueWrittenSubject.subscribe(v => {
            // rootElement.val(v.code).trigger('change', {propagateChanges: false});
        });
    }

    public ngOnInit(): void {
        this.control = this.injector.get(NgControl);
    }

    public ngOnDestroy(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }

    public writeValue(obj: T): void {
        this.valueWrittenSubject.next(obj);
    }

    public registerOnChange(fn: any): void {
        this.submitChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public setDisabledState(isDisabled: boolean): void {
        console.log('DIS', isDisabled);
    }

    private convertToSelect2Options(opts: T[]) {
        return opts && opts.map(opt => {
            // return {
            //     id: opt.code,
            //     text: opt.name,
            //     ref: opt
            // };
        });
    }

    // private getId(opt: T) {
        // return opt['id'] || this.definition.
    // }

    // private getText(opt: T) {
    //     return opt['id'] || this.definition.
    // }

    private getCurrentSelectOpts(element: JQuery) {
        return element.data().select2.options.options.data;
    }

    // private getBlankOption(): DropdownItem {
        // return {
        //     id: '-1',
        //     text: ''
        // };
    // }
}

interface Select2 extends JQuery {
    select2: Function;
}

interface ChangeEventData {
    propagateChanges: boolean;
}
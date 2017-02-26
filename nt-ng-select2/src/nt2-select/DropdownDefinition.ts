export interface DropdownDefinition<T> {

    getId: (value: T) => string;
    getSelectedText: (value: T) => string;
    getDropDownText: (value: T) => string;
}
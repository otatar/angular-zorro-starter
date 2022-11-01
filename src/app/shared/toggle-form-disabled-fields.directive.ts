import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';

@Directive({
  selector: '[appToggleFormDisabledFields]'
})
export class ToggleFormDisabledFieldsDirective implements OnChanges {
  @Input() formMode: 'show' | 'edit' | 'new';
  @Input() disableFields: string[] = [];

  constructor(private control: FormGroupDirective) {}

  ngOnChanges() {
    const state = this.formMode === 'edit' ? 'enable' : 'disable';
    this.control.directives.forEach((dir) => {
      if (this.disableFields.find((field) => field === dir.name)) {
        this.control.form.get(dir.name.toString())[state]();
      }
    });
  }
}

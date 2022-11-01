import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';

import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { DataTableColumn, DataTableItem } from './types';

interface DataTableHeader extends DataTableColumn {
  sortOrder?: NzTableSortOrder | null;
  sortDirections?: NzTableSortOrder[];
  sortFn?: NzTableSortFn<DataTableItem> | null;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  //Properties
  @Input() columns: DataTableColumn[];
  @Input() items: any[];
  @Input() name: string = 'Table';
  //Table vars
  headers: DataTableHeader[];
  nzPageSizeOptions: number[] = [5, 10, 20, 50];
  nzPageSize = 5;
  data = [];

  @ViewChild('search') search: ElementRef;

  //Emitters
  @Output() viewAction = new EventEmitter<number>();
  @Output() editAction = new EventEmitter<number>();
  @Output() deleteAction = new EventEmitter<number>();
  @Output() newAction = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    this.data = this.items;
    this.headers = this.columns.map((c) => {
      return {
        ...c,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: DataTableItem, b: DataTableItem) => {
          const key = c.key;
          if (a[key] > b[key]) {
            return -1;
          } else if (a[key] < b[key]) {
            return 1;
          } else {
            return 0;
          }
        },
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.items.currentValue;
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(150), distinctUntilChanged())
      .subscribe((x) => {
        const term = this.search.nativeElement.value;
        this.data = this.items.filter(this._filterFunction(term.toString()));
      });
  }

  private _filterFunction(key: string) {
    return function (o: Record<string, string | number>) {
      return Object.keys(o).some(function (k) {
        return o[k].toString().toLowerCase().indexOf(key) != -1;
      });
    };
  }

  onViewAction(id: number) {
    this.viewAction.emit(id);
  }

  onEditAction(id: number) {
    this.editAction.emit(id);
  }

  onDeleteAction(id: number) {
    this.deleteAction.emit(id);
  }

  onNewAction() {
    this.newAction.emit();
  }
}

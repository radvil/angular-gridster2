import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  CompactType,
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
  GridType
} from 'angular-gridster2';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MarkdownModule,
    GridsterComponent,
    GridsterItemComponent
  ]
})
export class ItemsComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  static itemInit(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    console.info('itemInitialized', item, itemComponent);
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
      compactType: CompactType.None,
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1
    };

    this.dashboard = [
      {
        cols: 4,
        rows: 3,
        y: 0,
        x: 0,
        initCallback: ItemsComponent.itemInit,
        itemAspectRatio: 4 / 3,
        minItemCols: 1,
        maxItemCols: 100,
        maxItemRows: 100,
        minItemRows: 1,
        minItemArea: 1,
        maxItemArea: 2500,
        dragEnabled: true,
        resizeEnabled: true,
        compactEnabled: true,
        resizableHandles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      { cols: 1, rows: 1, y: 20, x: 20 }
    ];
  }

  changedAspectRatio() {
    if (this.dashboard[0].itemAspectRatio === 1) {
      this.dashboard[0].rows = this.dashboard[0].cols;
    } else if (this.dashboard[0].itemAspectRatio === 4 / 3) {
      this.dashboard[0].cols = 4;
      this.dashboard[0].rows = 3;
    } else if (this.dashboard[0].itemAspectRatio === 16 / 9) {
      this.dashboard[0].cols = 16;
      this.dashboard[0].rows = 9;
    }
    this.changedOptions();
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
}

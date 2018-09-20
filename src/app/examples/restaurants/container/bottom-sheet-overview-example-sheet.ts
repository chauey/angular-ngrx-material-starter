import { MatBottomSheetRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
    styleUrls: ['bottom-sheet-overview-example-sheet.scss'],
  })
  // tslint:disable-next-line:component-class-suffix
  export class BottomSheetOverviewExampleSheet {
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }

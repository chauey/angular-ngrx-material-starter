import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';

import { AgmCoreModule } from '@agm/core';
import { RestaurantsEffects } from './restaurants/restaurants.effects';
import { RestaurantContainerComponent } from './restaurants/container/container.component';
import { RestaurantItemDetailComponent } from './restaurants/restaurant-item-detail/restaurant-item-detail.component';
import { BottomSheetOverviewExampleSheet } from '@app/examples/restaurants/container/bottom-sheet-overview-example-sheet';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      TodosEffects,
      StockMarketEffects,
      BooksEffects,
      FormEffects,
      RestaurantsEffects
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3N-8o3EeRQX6k_ShM6E01VuKCPE6TH9s'
    })
  ],
  declarations: [
    ExamplesComponent,
    TodosContainerComponent,
    StockMarketContainerComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    CrudComponent,
    FormComponent,
    RestaurantContainerComponent,
    RestaurantItemDetailComponent,
    BottomSheetOverviewExampleSheet
  ],
  providers: [StockMarketService],
  entryComponents: [BottomSheetOverviewExampleSheet]
})
export class ExamplesModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}

import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { MaleComponent } from './male/male.component';
import { BodySelectComponent } from './body-select/body-select.component';
import { SearchSymptomComponent } from './search-symptom/search-symptom.component';
import { ResultLoopComponent } from './result-loop/result-loop.component';
import { HttpService } from './http-service/http-service';
import { LoopModalComponent } from './result-loop/loop-modal/loop-modal.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent, children: [
    {path: '', component: BodySelectComponent},
    {path: 'search_symptom', component: SearchSymptomComponent},
    {path: 'result_loop', component: ResultLoopComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    MaleComponent,
    AppComponent,
    BodySelectComponent,
    SearchSymptomComponent,
    ResultLoopComponent,
    LoopModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [HttpService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [LoopModalComponent]
})
export class AppModule { }

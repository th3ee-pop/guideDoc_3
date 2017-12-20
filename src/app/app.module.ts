import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { BodySelectComponent } from './body-select/body-select.component';
import { SearchSymptomComponent } from './search-symptom/search-symptom.component';
import { ResultLoopComponent } from './result-loop/result-loop.component';
import { HttpService } from './http-service/http-service';

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
    BodySelectComponent,
    SearchSymptomComponent,
    ResultLoopComponent
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
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

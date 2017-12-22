/**
 * Created by th3ee on 12/20/17.
 */
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()

export class HttpService {
  searchPart: any;
  baseUrl = 'http://59.110.52.133:9999/kgInterface/';
  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {}

  private headers = new HttpHeaders({
  'Content-type': 'application/x-www-form-urlencoded; charset =utf'
  });

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error); // ?
  }

  getParams(params: any): any {
    return 'q=' + JSON.stringify(params);
  }
  getSymptoms(params: string): Observable<any> {
    console.log(this.getParams({'Name': params}));
    return this.http.get(this.baseUrl + 'getSymId/?q=' + '{"Name":%22' + params + '%22}')
      .do((res) => console.log(res));
  }

  getDisease(ID: Array<string>): Observable<any> {
    const str = JSON.stringify({
      'Ids': ID,
      'NotIds': [],
      'UnknownIds': []
    });
    return this.http.get(this.baseUrl + 'getSymDis/?q=' + str)
      .do((res) => console.log(res));
  }


}

import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FortMockApiReplyCallback =
  | ((data: { request: HttpRequest<any>; urlParams: { [key: string]: string } }) => ([number, string | any]) | Observable<any>)
  | undefined;

export type FortMockApiMethods =
  | 'get'
  | 'post'
  | 'patch'
  | 'delete'
  | 'put'
  | 'head'
  | 'jsonp'
  | 'options';

import { TestBed } from '@angular/core/testing';

import { httpInterceptor } from './http.service';

describe('HttpService', () => {
  let service: typeof httpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(httpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

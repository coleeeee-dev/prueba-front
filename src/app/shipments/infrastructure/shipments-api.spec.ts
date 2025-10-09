import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShipmentsApi } from './shipments-api';
import { ShipmentsApiEndpoint } from './shipments-api-endpoint';
import { environment } from '../../environments/environment';

describe('ShipmentsApi', () => {
  let api: ShipmentsApi;
  let httpMock: HttpTestingController;
  const base = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipmentsApi]
    });
    api = TestBed.inject(ShipmentsApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('listRecent() should call /shipments with sort and limit', () => {
    api.listRecent(4).subscribe();

    const req = httpMock.expectOne(base + ShipmentsApiEndpoint.recent(4));
    expect(req.request.method).toBe('GET');
    req.flush([]); // responde vacío
  });

  it('create() should POST to /shipments', () => {
    const payload = {
      id: 123, code: 'SND-999', client: 'ACME', destination: 'Lima',
      status: 'registered' as const, dateISO: '2024-01-15'
    };

    api.create(payload).subscribe(res => {
      expect(res).toEqual(payload);
    });

    const req = httpMock.expectOne(base + ShipmentsApiEndpoint.base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(payload);
  });
});

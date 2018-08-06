import { TestBed, inject } from '@angular/core/testing';

import { StatusCodeHandlerService } from './status-code-handler.service';

describe('StatusCodeHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusCodeHandlerService]
    });
  });

  it('should be created', inject([StatusCodeHandlerService], (service: StatusCodeHandlerService) => {
    expect(service).toBeTruthy();
  }));
});

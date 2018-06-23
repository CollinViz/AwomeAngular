import { TestBed, inject } from '@angular/core/testing';

import { EwepserverService } from './ewepserver.service';

describe('EwepserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EwepserverService]
    });
  });

  it('should be created', inject([EwepserverService], (service: EwepserverService) => {
    expect(service).toBeTruthy();
  }));
});

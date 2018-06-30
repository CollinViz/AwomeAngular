import { TestBed, inject } from '@angular/core/testing';

import { CustomFromHelperControlService } from './custom-from-helper-control.service';

describe('CustomFromHelperControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomFromHelperControlService]
    });
  });

  it('should be created', inject([CustomFromHelperControlService], (service: CustomFromHelperControlService) => {
    expect(service).toBeTruthy();
  }));
});

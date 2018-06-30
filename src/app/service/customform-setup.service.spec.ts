import { TestBed, inject } from '@angular/core/testing';

import { CustomformSetupService } from './customform-setup.service';

describe('CustomformSetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomformSetupService]
    });
  });

  it('should be created', inject([CustomformSetupService], (service: CustomformSetupService) => {
    expect(service).toBeTruthy();
  }));
});

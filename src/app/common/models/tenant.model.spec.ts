import { TenantModel } from './tenant.model';

describe('Tenant', () => {
  it('should create an instance', () => {
    expect(new TenantModel()).toBeTruthy();
  });
});

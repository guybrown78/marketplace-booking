import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMarketplaceComponent } from './search-marketplace.component';

describe('SearchMarketplaceComponent', () => {
  let component: SearchMarketplaceComponent;
  let fixture: ComponentFixture<SearchMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMarketplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

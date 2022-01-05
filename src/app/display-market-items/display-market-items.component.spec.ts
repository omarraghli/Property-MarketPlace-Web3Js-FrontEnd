import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMarketItemsComponent } from './display-market-items.component';

describe('DisplayMarketItemsComponent', () => {
  let component: DisplayMarketItemsComponent;
  let fixture: ComponentFixture<DisplayMarketItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMarketItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMarketItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

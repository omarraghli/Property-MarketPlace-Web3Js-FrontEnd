import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToMarketPlaceComponent } from './add-item-to-market-place.component';

describe('AddItemToMarketPlaceComponent', () => {
  let component: AddItemToMarketPlaceComponent;
  let fixture: ComponentFixture<AddItemToMarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemToMarketPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemToMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

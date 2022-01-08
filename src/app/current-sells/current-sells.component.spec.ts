import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSellsComponent } from './current-sells.component';

describe('CurrentSellsComponent', () => {
  let component: CurrentSellsComponent;
  let fixture: ComponentFixture<CurrentSellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSellsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

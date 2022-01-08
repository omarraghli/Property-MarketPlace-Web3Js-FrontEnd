import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropretiesComponent } from './my-propreties.component';

describe('MyPropretiesComponent', () => {
  let component: MyPropretiesComponent;
  let fixture: ComponentFixture<MyPropretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPropretiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

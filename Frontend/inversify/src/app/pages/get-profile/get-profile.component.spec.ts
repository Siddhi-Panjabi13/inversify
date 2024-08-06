import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProfileComponent } from './get-profile.component';

describe('GetProfileComponent', () => {
  let component: GetProfileComponent;
  let fixture: ComponentFixture<GetProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetProfileComponent]
    });
    fixture = TestBed.createComponent(GetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

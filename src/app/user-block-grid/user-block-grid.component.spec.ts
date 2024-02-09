import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockGridComponent } from './user-block-grid.component';

describe('UserBlockGridComponent', () => {
  let component: UserBlockGridComponent;
  let fixture: ComponentFixture<UserBlockGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBlockGridComponent]
    });
    fixture = TestBed.createComponent(UserBlockGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlocksComponent } from './user-blocks.component';

describe('UserBlocksComponent', () => {
  let component: UserBlocksComponent;
  let fixture: ComponentFixture<UserBlocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBlocksComponent]
    });
    fixture = TestBed.createComponent(UserBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

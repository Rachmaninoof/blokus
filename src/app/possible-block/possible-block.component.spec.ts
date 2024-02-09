import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleBlockComponent } from './possible-block.component';

describe('PossibleBlockComponent', () => {
  let component: PossibleBlockComponent;
  let fixture: ComponentFixture<PossibleBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PossibleBlockComponent]
    });
    fixture = TestBed.createComponent(PossibleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

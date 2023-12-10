import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAnswerComponent } from './setup-answer.component';

describe('SetupAnswerComponent', () => {
  let component: SetupAnswerComponent;
  let fixture: ComponentFixture<SetupAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupAnswerComponent]
    });
    fixture = TestBed.createComponent(SetupAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRoomComponent } from './left-room.component';

describe('LeftRoomComponent', () => {
  let component: LeftRoomComponent;
  let fixture: ComponentFixture<LeftRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

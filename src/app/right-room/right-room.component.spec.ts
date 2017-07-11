import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightRoomComponent } from './right-room.component';

describe('RightRoomComponent', () => {
  let component: RightRoomComponent;
  let fixture: ComponentFixture<RightRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

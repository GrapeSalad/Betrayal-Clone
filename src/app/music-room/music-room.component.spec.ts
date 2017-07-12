import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicRoomComponent } from './music-room.component';

describe('MusicRoomComponent', () => {
  let component: MusicRoomComponent;
  let fixture: ComponentFixture<MusicRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

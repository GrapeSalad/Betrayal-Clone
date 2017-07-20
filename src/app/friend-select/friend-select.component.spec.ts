import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSelectComponent } from './friend-select.component';

describe('FriendSelectComponent', () => {
  let component: FriendSelectComponent;
  let fixture: ComponentFixture<FriendSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

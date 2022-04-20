import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPlayerComponent } from './create-new-player.component';

describe('CreateNewPlayerComponent', () => {
  let component: CreateNewPlayerComponent;
  let fixture: ComponentFixture<CreateNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

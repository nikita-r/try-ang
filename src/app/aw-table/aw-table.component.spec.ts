import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AWTableComponent } from './aw-table.component';

describe('AWTableComponent', () => {
  let component: AWTableComponent;
  let fixture: ComponentFixture<AWTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AWTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AWTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

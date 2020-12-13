import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureWorksComponent } from './adventure-works.component';

describe('AdventureWorksComponent', () => {
  let component: AdventureWorksComponent;
  let fixture: ComponentFixture<AdventureWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookModalComponent } from './view-book-modal.component';

describe('ViewBookModalComponent', () => {
  let component: ViewBookModalComponent;
  let fixture: ComponentFixture<ViewBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

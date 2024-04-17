import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreModalComponent } from './add-genre-modal.component';

describe('AddGenreModalComponent', () => {
  let component: AddGenreModalComponent;
  let fixture: ComponentFixture<AddGenreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGenreModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGenreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEverythingConfirmationDialogComponent } from './delete-everything-confirmation-dialog.component';

describe('DeleteEverythingConfirmationDialogComponent', () => {
  let component: DeleteEverythingConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteEverythingConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEverythingConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEverythingConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

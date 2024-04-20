import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranformManagementComponent } from './tranform-management.component';

describe('TranformManagementComponent', () => {
  let component: TranformManagementComponent;
  let fixture: ComponentFixture<TranformManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranformManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranformManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

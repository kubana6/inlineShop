import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeOrdersComponent } from './tree-orders.component';

describe('TreeOrdersComponent', () => {
  let component: TreeOrdersComponent;
  let fixture: ComponentFixture<TreeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeOrdersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceGoodsComponent } from './choice-goods.component';

describe('ChoiceGoodsComponent', () => {
  let component: ChoiceGoodsComponent;
  let fixture: ComponentFixture<ChoiceGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

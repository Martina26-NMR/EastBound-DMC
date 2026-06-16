import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorMade } from './tailor-made';

describe('TailorMade', () => {
  let component: TailorMade;
  let fixture: ComponentFixture<TailorMade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailorMade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailorMade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

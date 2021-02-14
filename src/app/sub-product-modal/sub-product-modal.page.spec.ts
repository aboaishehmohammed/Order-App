import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubProductModalPage } from './sub-product-modal.page';

describe('SubProductModalPage', () => {
  let component: SubProductModalPage;
  let fixture: ComponentFixture<SubProductModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProductModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

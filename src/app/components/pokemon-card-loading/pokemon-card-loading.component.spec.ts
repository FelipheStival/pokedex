import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonCardLoadingComponent } from './pokemon-card-loading.component';

describe('PokemonCardLoadingComponent', () => {
  let component: PokemonCardLoadingComponent;
  let fixture: ComponentFixture<PokemonCardLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonCardLoadingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

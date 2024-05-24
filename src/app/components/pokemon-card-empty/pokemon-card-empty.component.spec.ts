import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonCardEmptyComponent } from './pokemon-card-empty.component';

describe('PokemonCardEmptyComponent', () => {
  let component: PokemonCardEmptyComponent;
  let fixture: ComponentFixture<PokemonCardEmptyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonCardEmptyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

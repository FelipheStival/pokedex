import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { PokemonCardLoadingComponent } from 'src/app/components/pokemon-card-loading/pokemon-card-loading.component';
import { PokemonCardEmptyComponent } from 'src/app/components/pokemon-card-empty/pokemon-card-empty.component';



@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonCardLoadingComponent,
    PokemonCardEmptyComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PokemonCardComponent,
    PokemonCardLoadingComponent,
    PokemonCardEmptyComponent
  ]
})
export class PokemonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonsPageRoutingModule } from './pokemons-routing.module';

import { PokemonsPage } from './pokemons.page';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { PokemonCardLoadingComponent } from 'src/app/components/pokemon-card-loading/pokemon-card-loading.component';
import { PokemonModule } from 'src/app/modules/pokemon/pokemon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonsPageRoutingModule,
    PokemonModule
  ],
  declarations: [
    PokemonsPage
  ]
})
export class PokemonsPageModule {}

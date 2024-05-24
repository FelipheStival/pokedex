import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonsPageRoutingModule } from './pokemons-routing.module';

import { PokemonsPage } from './pokemons.page';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonsPageRoutingModule
  ],
  declarations: [
    PokemonsPage,
    PokemonCardComponent
  ]
})
export class PokemonsPageModule {}

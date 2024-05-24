import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { PokemonModule } from 'src/app/modules/pokemon/pokemon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    PokemonModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}

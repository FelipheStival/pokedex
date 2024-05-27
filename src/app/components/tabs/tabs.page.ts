import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public numberFavorites: number = 0;

  constructor(
    private storageService: StorageService,
    private pokemonService: PokemonService
  ) {

    this.pokemonService.onFavoritedPokemon.subscribe({
      next: (data: any) => {
        this.countFavoritesPokemon();
      }
    });

    this.countFavoritesPokemon();

  }

  private async countFavoritesPokemon() {
    
    let pokemons: any = await this.storageService.get('favorites_pokemons');

    if(pokemons) {
      this.numberFavorites = pokemons.length;
    }

  }

}

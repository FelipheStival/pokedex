import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent  implements OnInit {

  @Input('pokemon') pokemon: any;
  @Output('eventFavorited') eventFavorited = new EventEmitter();

  public pokemonData: any;
  public loading: boolean =  true;
  public isFavorite: boolean = false;
  
  constructor(
    private pokemonService: PokemonService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.load();
  }

  /**
   * Método para carregar os dados do pokemon realizando uma
   * requisição.
   */
  private async load() {
    
    this.pokemonService.getByName(this.pokemon.name).subscribe({
      next: async (data) => {

        this.pokemonData = data;
        this.loading = false;

        await this.isFavorited();
        
      },
      error: (err) => {

      }
    });

  }

  /**
   * Método para checar se o pokemon está marcado como favorito
   */
  private async isFavorited() {

    let favoritesPokemon: any = await this.storageService.get('favorites_pokemons');
    let check = favoritesPokemon.find((data: any) => {
      return data.name == this.pokemon.name;
    });

    this.isFavorite = check ? true : false;
    
  }

  /**
   * Método para adicionar um pokemon aos favoritos
   * @param pokemon dados do pokemon escolhido
   */
  public async favorite(pokemon: any) {

    let favoritesPokemon = await this.storageService.get('favorites_pokemons');

    if(favoritesPokemon) {

      // Checando se pokemon já existe como favorito
      let check = favoritesPokemon.find((data: any) => {
        return data.name == pokemon.name;
      });

      // Caso não exista no Array será adicionado como favorito
      if(!check) {

        favoritesPokemon.push(pokemon);
        this.isFavorite = true;

        this.toastService.show('Pokemon favoritado com sucesso!');

      } else {

         // Caso exista o pokemon será removido como favorito
         favoritesPokemon = favoritesPokemon.filter((data: any) => {
          return data.name != pokemon.name;
         });

         this.isFavorite = false;
         this.toastService.show('Pokemon removido dos favoritos!');
         
      }

    } else {

      favoritesPokemon = [];
      favoritesPokemon.push(pokemon);

    }

    await this.storageService.set('favorites_pokemons', favoritesPokemon);
    this.eventFavorited.emit ({ favorited: true });
    
  }

}

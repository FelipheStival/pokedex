import { Component, EventEmitter, Input, OnInit, Output, OutputEmitterRef, input, output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError } from 'rxjs';
import { PokemonDetailsPage } from 'src/app/pages/pokemon-details/pokemon-details.page';
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
  @Output('onError') onError = new EventEmitter();

  public pokemonData: any;
  public loading: boolean =  true;
  public isFavorite: boolean = false;
  
  constructor(
    private pokemonService: PokemonService,
    private storageService: StorageService,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
    this.load();

    this.pokemonService.onFavoritedPokemon.subscribe({
      next: async (data: any) => {
        await this.isFavorited();
      }
    })

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
        this.onError.emit({ error: err });
      }
      
    });

  }

  /**
   * Método para checar se o pokemon está marcado como favorito
   */
  private async isFavorited() {

    let favoritesPokemons = await this.storageService.get('favorites_pokemons');
    let check: any;

    if(favoritesPokemons) {

      check = favoritesPokemons.find((data: any) => {
        return data.name == this.pokemon.name;
      });

    }
    
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

    this.eventFavorited.emit ({ pokemon: pokemon });
    this.pokemonService.onFavoritedPokemon.emit({ pokemon: pokemon });
    
  }

   /**
   * Método para abrir o modal para visualização dos dados do pokemon
   * @param pokemon dados do pokemon escolhido
   */
  public async openModal(pokemon: any) {

    const modal = await this.modalCtrl.create({
      component: PokemonDetailsPage,
      componentProps: { pokemon }
    });

    modal.present();
    
  }

}

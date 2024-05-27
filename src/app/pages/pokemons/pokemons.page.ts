import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {

  public pokemons : any = [];
  public offset: number = 1;
  public intervalSearch: any;

  constructor(
    private pokemonService: PokemonService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.load();
  }

  /**
   * Método para carregar os dados iniciais do aplicativo
   * @param event dados do evento
   * @param resetData indica se o array de dados será resetado
   */
  public async load(event: any = null, resetData = false) {

    let loading = await this.loadingService.showLoading();

    if(resetData) {
      this.pokemons = [];
    }

    this.pokemonService.get(6, this.offset).subscribe({
      next: async (data: any) => {

        // Quando for evento do infinite scroll apenas será adicionado ao array
        if(this.pokemons) {
          this.pokemons.push(...data.results)
        } else {
          this.pokemons = data.results;
        }

        await loading.dismiss();

        if(event) {
          event.target.complete();
        }

      },
      error: (err) => {

        this.pokemons = [];
        this.toastService.show('Não foi possível obter os pokemons');
        loading.dismiss();
        
      }

    });
    
    this.offset += 6;

  }

  /**
   * Método para encontrar um pokemon pelo nome
   * @param event evento de digitação na barra de procura
   */
  public search(event: any) {
    
    if(this.intervalSearch) {
      clearTimeout(this.intervalSearch);
    }

    this.intervalSearch = setTimeout(() => {

      if(event.detail.value) {

        let pokemonName = event.detail.value.replace(" ", "").toLowerCase();
        let data = {
          name: pokemonName
        };
  
        this.pokemons = [];
        this.pokemons.push(data);

      } else {

        this.offset = 0;
        this.load(null, true);

      }

    }, 500);

  }

  /**
   * Método para limpar a lista de pokemons e resetar o offset
   */
  public clear(event: any) {

    this.pokemons = [];

    if(event.error.status == 404) {
      this.toastService.show('Nome do pokemon não encotrado, tente novamente!', 'bottom', 1200);
    }

  }

}

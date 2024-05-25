import { Component, OnInit } from '@angular/core';
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

  constructor(
    private pokemonService: PokemonService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.load();
  }

  /**
   * Método para carregar os dados iniciais do aplicativo
   */
  public load(event: any = null) {

    this.pokemonService.get(6, this.offset).subscribe({
      next: (data: any) => {

        // Quando for evento do infinite scroll apenas será adicionado ao array
        if(this.pokemons) {
          this.pokemons.push(...data.results)
        } else {
          this.pokemons = data.results;
        }

      },
      error: (err) => {
        this.toastService.show('Não foi possível obter os pokemons');
      }

    });
      
    if(event) {
      event.target.complete();
    }
    
    this.offset += 6;

  }

}

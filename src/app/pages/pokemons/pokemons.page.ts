import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {

  public pokemons : any ;
  public currentPage: number = 1;

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.load();
  }

  /**
   * Método para carregar os dados iniciais do aplicativo
   */
  public load() {

  }

}

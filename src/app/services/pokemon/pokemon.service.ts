import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private httpService: HttpService
  ) { }


  /**
   * Método para obter a lista de todos os pokemons
   * @param limit número de pokemons que a API deve retornar
   */
  public get(limit: number, offset: number = 0) {

    let url = `pokemon/?limit=${limit}&offset=${offset}`;
    return this.httpService.get(url);

  }
}

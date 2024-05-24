import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public pokemons: any = [];

  constructor(
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async ionViewWillEnter() {
    await this.load();
  }

  public async load() {
    this.pokemons = await this.storageService.get('favorites_pokemons');
  }

}

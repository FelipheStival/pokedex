import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) { 
    this.init();
  }
  
  /**
   * Método para iniciar o storage
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
  * Método para colocar um item no storage
  */
  public async set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  /**
   * Método para obter um item do storage
   * @param key 
   */
  public async get(key: string) {
    return this._storage?.get(key);
  }

}

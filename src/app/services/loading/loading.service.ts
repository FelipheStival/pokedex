import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  /**
   * Método para apresentar a tela de carregamento
   * @returns 
   */
  async showLoading(message: string = 'Carregando...') {

    const loading = await this.loadingCtrl.create({
      message: message,
      cssClass: 'custom-loading',
      translucent: true,
      spinner: 'bubbles'
    });

    loading.present();
    
    return loading;

  }

}

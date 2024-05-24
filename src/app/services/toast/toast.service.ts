import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }


  /**
   * Método para apresentar o toast
   * @param message mensagem a ser apresentada
   */
  public async show(message: string, positionToast: any = 'top') {

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      icon: 'chatbox',
      position: positionToast
    });

    await toast.present();

  }

}

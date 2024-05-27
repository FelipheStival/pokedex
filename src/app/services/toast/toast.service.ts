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
   * @param positionToast posição do toast
   * @param duration duração do toast
   */
  public async show(message: string, positionToast: any = 'bottom', durationToast = 500) {

    const toast = await this.toastController.create({
      message: message,
      duration: durationToast,
      icon: 'chatbox',
      position: positionToast
    });

    await toast.present();

  }

}

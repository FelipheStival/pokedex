import { Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  @Input('pokemon') pokemon: any;
  @ViewChild('canvas') canvas!: ElementRef;

  public title: string = '';
  public segmentSelect: string = 'chart';
  public chart: any = []
  public dataChart: any = [];
  public loadingChart: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {

  }

  async ionViewWillEnter() {

    this.title = this.pokemon.name;

    this.pokemon.stats.forEach((stat: any) => {

      let formattedStat = {
        stat: stat.stat.name,
        value: stat.base_stat
      }

      this.dataChart.push(formattedStat);

    });
    
    this.createChart();
    
  }

  /**
  * Método para criar o gráfico de radar de habilidades
  */
  public async createChart() {

    let loading = await this.loadingService.showLoading();
    let labels = this.dataChart.map((data: any) => { return data.stat });
    let values = this.dataChart.map((data: any) => { return data.value });

    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Habilidades',
            data: values,
            borderWidth: 1,
            backgroundColor: 'rgba(240, 84, 84, 0.5)'
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: false
          },
        },
      },
    });

    await loading.dismiss();

  }

  /**
  * Método para fechar o modal
  */
  public close() {
    this.modalCtrl.dismiss();
  }

  /**
   * Método para trocar o segmento selecionado
   * @param event dados do evento
   */
  public changeSegment(event: any) {
    this.segmentSelect = event.detail.value;
  }

}

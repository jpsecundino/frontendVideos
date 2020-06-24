import { Component, OnInit, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { DAOService } from '../shared/dao.service';
import { Trechos } from '../shared/models/trechos';
import {Router } from '@angular/router';
import { Avaliacoes } from '../shared/models/avaliacoes';
import { REST_URL_TRECHOS, REST_URL_AVALIACOES } from '../shared/REST_API_URLs';

@Component({
    templateUrl: './video.component.html',  
    selector: 'app-video',
})
export class VideoComponent implements OnInit {
  w : number = 660; // largura vídeo
  h : number=  440; // altura vídeo
  video_endereco : string = "";  //id do vídeo
  jornal : string = "";
  inicio : number = 0; // segundo início
  fim : number = 0; // segund final
  assiste : boolean = true; // alterna entre vídeo e botões
  @Input() nome : string; // nome do avaliador
  @Input() email : string; // e-mail do avaliador
  atual : number =0; // posição do vídeo
  @Input() lista : Trechos[]; // lista de vídeos
  currentTime: number;
  avaliacao : Avaliacoes;


  constructor( private router : Router, private dao : DAOService){

  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    this.assiste = true;
    console.log (this.lista[0].video_endereco);
    this.video_endereco = this.lista[0].video_endereco;
    this.inicio = this.lista[0].inicio;
    this.fim = this.lista[0].fim;
    this.assiste=true;
    this.atual = 0;
  }


  form_adress(video_adress: string, begin: number,  end: number) : string{
    
    let adress: string = "https://drive.google.com/uc?export=download&id="
    adress = adress.concat(video_adress,"#t=",begin.toString(),",",(end + 1).toString());
    console.log(adress);
    return adress;
  }

  mudou ($event) {
        console.log ("Acabou o vídeo");
        this.assiste = false;
  }

  fvideo():boolean{
      return this.assiste;
  }

  create(){
    this.dao.create(REST_URL_AVALIACOES, this.avaliacao).subscribe(data => {
      //console.log(data)
    }, error => console.log(error))
  }

  grava(resposta: string){

      //grava...
      this.avaliacao = new Avaliacoes(this.nome, this.email, this.lista[this.atual].id,resposta);
      this.create();

      //próximo da fila
      this.atual++;

      if (this.atual < this.lista.length){
        this.video_endereco = this.lista[this.atual].video_endereco;
        this.inicio = this.lista[this.atual].inicio;
        this.fim = this.lista[this.atual].fim;
        this.assiste=true;
      } else {
        this.router.navigate(['/private/fim']);        
      }
  }
}

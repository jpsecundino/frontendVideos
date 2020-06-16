import { Component, OnInit } from '@angular/core';
import { REST_URL_TRECHOS } from 'src/app/shared/REST_API_URLs';
import { DAOService } from 'src/app/shared/dao.service';
import { Trechos } from 'src/app/shared/models/trechos';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  lista : Trechos[];
  nome : string;
  email : string;
  v_iniciar : boolean = false;

  constructor(private dao : DAOService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
    this.email= this.activatedRoute.snapshot.paramMap.get('parametro');
    this.nome= this.activatedRoute.snapshot.paramMap.get('parametro2');
  }

  getAll = () => {
    this.dao.getAll(REST_URL_TRECHOS).subscribe(
      data => {

        this.lista = this.getOnePerSubject(data);
        console.log('Dados');
        console.log(data);
        console.log('Lista');
        console.log(this.lista);
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    )
  };

  getRndInt(min, max) : number{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  getOnePerSubject(data: Trechos[]) : Trechos[] {
    var sortedData: Trechos[] = data.sort((a,b) => a.video_assunto.localeCompare(b.video_assunto))
    var finalData: Trechos[] = [];
    var subjectList: string[] = [];
    var subjCount: number = -1;
    interface subject {
      subjectName: string;
      firstOccurrence: number;
      lastOccurrence: number;
    }
    
    var subjectSet: subject[] = [];
    
    for (var i = 0; i < sortedData.length; i++) {
      if(!subjectList.includes(sortedData[i].video_assunto)){
        
        subjectList.push(sortedData[i].video_assunto);
        subjCount++;
        subjectSet.push({subjectName: sortedData[i].video_assunto, firstOccurrence: i, lastOccurrence:i  });
        
        if(i != 0 ) subjectSet[subjCount-1].lastOccurrence = i-1;

      }
      else if(i == sortedData.length-1) {        
        subjectSet[subjCount].lastOccurrence = i;      
      }

    }

    for(var i = 0; i < subjectSet.length; i++){
      //pega um trecho aleatório por assunto
      var min: number = subjectSet[i].firstOccurrence;
      var max: number = subjectSet[i].lastOccurrence;
  
      var idx = this.getRndInt(min, max);
      
      finalData.push(sortedData[idx]);
    }

    console.log('Final data');
    console.log(finalData);

    return finalData;
  }

  iniciar(){
    this.v_iniciar = true;
  }

}

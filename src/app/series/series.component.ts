import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Series } from '../model/series.model';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  formSeries: FormGroup;
  id: string;
  constructor(private formBuilder: FormBuilder,private series: SeriesService, private route: ActivatedRoute,private router: Router) { 
    this.formSeries=this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(3)]],
      plataforma: ['', Validators.required],
      duracion:['',[Validators.required,Validators.max(999)]]
    });
    this.route.params.subscribe(parameters=>{
      if(parameters.id){
        this.id=parameters.id;
        this.series.getSingleSerie(parameters.id).subscribe(res=>{
          this.formSeries.get('nombre').setValue(res.nombre);
          this.formSeries.get('plataforma').setValue(res.plataforma);
          this.formSeries.get('duracion').setValue(res.duracion);
        });

      }

    });
  }

  ngOnInit(): void {
  }

  saveClick(){
    
    const data=new Series();
    data.nombre=this.formSeries.get('nombre').value;
    data.plataforma=this.formSeries.get('plataforma').value;
    data.duracion=this.formSeries.get('duracion').value;
    
    if(this.id){
      this.series.updateSeries(this.id,data).subscribe(()=>{
        this.router.navigate(['list']);
      },error =>{
        alert("Ocurrio un error al actualizar el elemento");
      });
    }else{
      this.series.saveSeries(data).subscribe(()=>{
        this.router.navigate(['list']);
      },error =>{
        alert("Ocurrio un error al guardar el elemento");
      })
    }
  }
  

}

import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Series } from '../model/series.model';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns=['_id','nombre','plataforma','duracion','actions'];
  dataSource=new MatTableDataSource<Series>();

  constructor(private series:SeriesService, private router:Router) { 
    this.series.getSeries().subscribe(res =>{
      this.dataSource.data=res;
    });
  }

  ngOnInit(): void {
  }

  delete(id:string){
    this.series.deleteSeries(id).subscribe(()=>{
      this.refresh();
    }, err=>{
      alert("ocurrio un error al borrar el elemento")
    }
    );
  }
  edit(id:string){
    this.router.navigate(['series',id]);

  }
  refresh(){
    this.series.getSeries().subscribe(res =>{
      this.dataSource.data=res;
    });
  }

}

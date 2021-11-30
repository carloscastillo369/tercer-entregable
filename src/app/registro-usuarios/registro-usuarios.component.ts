import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  show:boolean = true;
  active:string = "active"

  constructor() { }

  ngOnInit(): void {
  }

}

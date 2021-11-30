import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  show:boolean = true;

  users:User[]=[
    new User('Rodrigo','Perez','Rodri23','rodrigo.perez@correo.com',999324992,true),
    new User('Martha','Gomez','Martha333','martha_gomez@correo.com',934748739,true)
  ];

  formularioRegistro = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    checkbox: new FormControl('')
  })

  onResetForm(){
    this.formularioRegistro.reset();
  }

  onSaveForm(){
    this.users.push(this.formularioRegistro.value);
    this.onResetForm();  
  }

  constructor() { }

  ngOnInit(): void {
  }

}

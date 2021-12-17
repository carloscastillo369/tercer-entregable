import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  show:boolean = true;

  users:User[]=[
    new User('Rodrigo Fernando','Perez Gutierrez','Rodri23','rodrigo.perez@correo.com',999324992,true),
    new User('Martha Alexandra','Gomez Silva','Martha333','martha_gomez@correo.com',934748739,true)
  ];

  patternLetters = /^[a-zA-Z ñ]+$/;
  patternUser = /^[0-9a-zA-Zñ]+$/;
  patternEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;

  modal:string='modal';

  formularioRegistro = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3), 
          Validators.maxLength(20), 
          Validators.pattern(this.patternLetters)
        ]),
    lastname: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20), 
        Validators.pattern(this.patternLetters)
      ]),
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12), 
        Validators.pattern(this.patternUser)
      ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(this.patternEmail)
      ]),
    phonenumber: new FormControl('',
      [
        Validators.required,
        Validators.min(111111111), 
        Validators.max(999999999)
      ]),
    checkbox: new FormControl('',[Validators.requiredTrue])
  })

  isValidField (field:string){
    return this.formularioRegistro.get(field)?.valid;
  }

  isInvalidField (field:string) {
    return (
      this.formularioRegistro.get(field)?.invalid && 
      (this.formularioRegistro.get(field)?.dirty || this.formularioRegistro.get(field)?.touched)
    )
  }

  onResetForm(){
    this.formularioRegistro.reset();
  }

  onSaveForm(){
    if(this.formularioRegistro.valid){
      this.users.push(this.formularioRegistro.value);
      this.modal = '';
      this.onResetForm();  
    }
  }

  closeModal(){
    this.modal = 'modal';
  }

  getErrorMessage (field:string) {
    let message;

    if (this.formularioRegistro.get(field)?.errors?.required) {
      switch(field) {
        case 'name':
          message = 'Por favor, ingrese su nombre.';
          break;
        case 'lastname':
          message = 'Por favor, ingrese su apellido.';
          break;
        case 'username':
          message = 'Por favor, ingrese un nombre de usuario.';
          break;
        case 'email':
          message = 'Por favor, ingrese su dirección de correo electrónico.';
          break;
        case 'phonenumber':
          message = 'Por favor, ingrese su número de teléfono o celular.';
          break;
        default:
          message = 'Debe aceptar los términos y condiciones.';
      }
    } else if (this.formularioRegistro.get(field)?.hasError('pattern')) {
      switch(field) {
        case 'username':
          message = 'Formato incorrecto, ingrese solo letras y números.';
          break;
        case 'email':
          message = 'Por favor, ingrese una dirección de correo electrónico válida (p.e. someone@example.com).';
          break;
        case 'phonenumber':
          message = 'Por favor, ingrese su número de teléfono o celular.';
          break;
        default:
          message = 'Formato incorrecto, ingrese solo letras.';
      }
    } else if (this.formularioRegistro.get(field)?.hasError('minlength')) {
      const minLength = this.formularioRegistro.get(field)?.errors?.minlength.requiredLength;
      message = `Ingrese mínimo ${minLength} caracteres`
    } else if (this.formularioRegistro.get(field)?.hasError('maxlength')) {
      const maxLength = this.formularioRegistro.get(field)?.errors?.maxlength.requiredLength;
      message = `Ingrese máximo ${maxLength} caracteres`
    } else if (this.formularioRegistro.get(field)?.hasError('min') || this.formularioRegistro.get(field)?.hasError('max')) {
      message = `Ingrese un número de 9 dígitos.`
    }

    return message;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

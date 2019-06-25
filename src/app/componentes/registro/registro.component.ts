import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ClienteService} from '../../services/cliente/cliente.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formularioRegistro: FormGroup;
  public cc: string;

  constructor(private router: Router, private formBuider: FormBuilder, public clienteService: ClienteService) { }

  ngOnInit() {
    //this.getClienteId('000');
    this.buildForm();
  }

  private buildForm() {


    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.formularioRegistro = this.formBuider.group({
      cc: ['', [Validators.required]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: [today, [Validators.required, this.esMayorDeEdad]]
    });
  }

  public register() {
    const user = this.formularioRegistro.value;
    console.log(user);
    this.getClienteId(user);
    //this.registrarCliente(user);
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formularioRegistro.get(controlName);

    if (control.touched && control.errors != null) {
      //console.log(control.errors);
      //console.log("Valor :"+control.value);
      if (control.errors.required) {
        error = 'Campo requerido\t';
      } else if (control.errors.edad) {
        error = 'Debe ser mayor de edad para poder registrarse\t';
      } else {
        error = error + 'error sin conocer';
      }

    }
    return error;
  }

  private esMayorDeEdad(control: AbstractControl) {
    var fechaNacimiento = control.value;
    let error = null;
    var hoy = new Date();
    var cumpleanos = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    if (edad < 18) {
      error = { ...error, edad: 'Debe ser mayor de edad para poder registrarse' };
    }
    return error;
  };

  private getClienteId(user){
    var cc = user.cc;
    this.clienteService.getCliente(cc).subscribe(resultado=>{
      console.log(resultado);
      this.cc = resultado.cc;
      console.log('cc: '+this.cc);
      console.log('Ya existe un usuario registrado con este documento');
      
    },
    error=>{
      if(error.status == '404'){
        this.cc = null;
        console.log('No existe el usuario, se puede registrar');
        this.registrarCliente(user);
      }
      console.log(JSON.stringify(error.status));
    });

  }

  private registrarCliente(cliente: any){
    this.clienteService.postCliente(cliente).subscribe(resultado=>{
      console.log(resultado);
      //directo a consultas
      //TODO
      this.router.navigate(['/']);
    },
    error => {
      console.log(JSON.stringify(error.status));
    });
  }


}

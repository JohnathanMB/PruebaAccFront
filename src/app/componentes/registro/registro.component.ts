import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formularioRegistro: FormGroup;
  public errorFecha: string = 'hola';

  constructor(private formBuider: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {

    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.formularioRegistro = this.formBuider.group({
      CC: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: [today, [Validators.required, this.esMayorDeEdad]]
    });
  }

  public register() {
    const user = this.formularioRegistro.value;
    console.log(user);
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formularioRegistro.get(controlName);

    if (control.touched && control.errors != null) {
      console.log(control.errors);
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

    //this.errorFecha = 'Debe ser mayor de edad para poder registrarse';

    //console.log(error);
    return error;
  };

}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public formularioConsulta: FormGroup;

  constructor(private formBuider: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.formularioConsulta = this.formBuider.group({
      empresa: [],
      nit: ['', [Validators.required,  this.esEntero, this.formatoNit]],
      salario: ['', [Validators.required, Validators.max(100000000), Validators.min(0), this.esEntero]],
      fecha_ingreso: [today, [Validators.required, this.esPasado]]
    });
  }

  private esEntero(control: AbstractControl){
    let error = null;
    var datoEntero = control.value;
    
    if(!Number.isInteger(datoEntero)){
      error = { ...error, tipo_entero: 'Se requiere valor entero' };
    }

    return error;
  }

  private formatoNit(control: AbstractControl){
    let error = null;
    var nit = control.value;
    var cadenaNit = nit.toString();
    if(cadenaNit.length != 10){
      error = { ...error, formato_nit: 'El nit ingresado no cumple con el formato XXXXXXXXXY' };
    }
    return error;
  }

  private esPasado(control: AbstractControl){
    let error = null;
    var fecha_ingreso = control.value;
    const today = new Date().toISOString().substring(0, 10);

    if(today <= fecha_ingreso){
      error = { ...error, ingreso: 'La fecha de ingreso debe ser posterior al dia de hoy' };
    }

    return error;
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formularioConsulta.get(controlName);
    if (control.touched && control.errors != null) {
      console.log(control.errors);
      if (control.errors.required) {
        error = 'Campo requerido';
      } else if (control.errors.ingreso) {
        error = control.errors.ingreso;
      } else if (control.errors.max) {
        error = 'El salario debe ser menor a 100.000.000';
      } else if (control.errors.min) {
        error = 'El salario debe ser un valor positivo';
      } else if (control.errors.tipo_entero) {
        error = control.errors.tipo_entero;
      } 
      else if (control.errors.formato_nit) {
        error = control.errors.formato_nit;
      } 
      else {
        error = error + 'error sin conocer';
      }

    }
    return error;
  }

  private convertirStringAArreglo(cadena: string){
    var digito = new Array(cadena.length);

    for(var i=0; i<cadena.length; i++){
      digito[i] = cadena.charAt(i);
    }

    return digito;

  }



}

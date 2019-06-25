import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ClienteService} from '../../services/cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;
  public loginFail;

  constructor(private router: Router, private formBuider: FormBuilder, public clienteService: ClienteService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(){
    this.formularioLogin = this.formBuider.group({
      cc: ['', Validators.required]
    })
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formularioLogin.get(controlName);
    if (control.touched && control.errors != null) {
      
      if (control.errors.required) {
        error = 'Campo requerido\t';
      }  else {
        error = error + 'error sin conocer';
      }

    }
    return error;
  }

  public ingresar(){
    const cc = this.formularioLogin.value.cc;
    console.log(cc);
    this.getClienteId(cc);
  }

  private getClienteId(cc){
    this.clienteService.getCliente(cc).subscribe(resultado=>{
      console.log(resultado);
      this.clienteService.setUser(resultado.cc);
      this.loginFail = false;
      this.router.navigate(['/consulta']);
    },
    error=>{
      if(error.status == '404'){
        this.loginFail = true;
      }
      console.log(JSON.stringify(error.status));
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  fg!: FormGroup;
  isLogged: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fg = this._fb.group({
      nickname: ["Admin", [Validators.required]],
      password: ["verysecret", [Validators.required]]
    });
    this._loginService.token$.subscribe({
      next: token => this.isLogged = token != null
    });
  }

  submit(){
    if(this.fg.invalid)
      return;
    this._loginService.login(this.fg.value).subscribe({
      next : () =>{
        this._messageService.add({severity:'success', summary:'Connexion', detail:"La connexion a réussi!"});
      },
      error : (err) => {
        this._messageService.add({severity:'error', summary:'Connexion', detail: err});
        console.log(err);
      }

    });
  }

  logout(){
    if(this.isLogged){
      this._loginService.logout();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Member } from 'src/app/core/models/member.model';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  overlayPanel! : OverlayPanel;
  isLogged : boolean = false;
  userLogged : Member | null = null;

  constructor(
    private _loginService : LoginService,
    private _messageService : MessageService
    )
  {}

  ngOnInit(){
    this._loginService.token$.subscribe({
      next: (token) =>{
        if(token){
          this.overlayPanel.hide();
          this.isLogged = true;
        }
      }
    });
    this._loginService.user$.subscribe({
      next: (user) =>{
        this.userLogged = user;
      }
    });
  }

  openConnection(event: any, opElement: OverlayPanel) {
    this.overlayPanel = opElement;
    if(!this.isLogged){
      this.overlayPanel.toggle(event);
    }
  }

  closeConnection(){
    if(this.isLogged){
      this._loginService.logout();
      this.isLogged = false;
      this.userLogged = null;
      this._messageService.add({severity:'success', summary:'Déconnexion', detail:"Vous êtes bien déconnecté"});
    }
  }

}

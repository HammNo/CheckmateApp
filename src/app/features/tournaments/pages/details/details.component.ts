import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/core/enums/role.enum';
import { LoginService } from 'src/app/core/services/login.service';
import { Category } from '../../enums/category.enum';
import { Status } from '../../enums/status.enum';
import { Tournament } from '../../models/tournament.model';
import { TournamentsApiService } from '../../services/tournaments-api.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  tournament! : Tournament;
  isLogged : boolean = false;
  currentUserRole : Role | null = null;
  roles = Role;

  constructor(
    private _dialogConfig : DynamicDialogConfig,
    private _tournamentsService : TournamentsApiService,
    private _messageService: MessageService,
    private _router : Router,
    private _loginService : LoginService,
    private _dialoRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.tournament = this._dialogConfig.data;
    this._loginService.token$.subscribe({
      next: (token) =>{
        if(token){
          this.isLogged = true;
        }
      }
    });
    this._loginService.role$.subscribe({
      next: (role) =>{
        this.currentUserRole = role;
      }
    });
  }

  remove(id: number) {
    this._tournamentsService.delete(id).subscribe({
      next: (data) => {
        this._messageService.add({severity:'success', summary:'Réussite', detail:"Le tournoi a été supprimé"});
        this._dialoRef.close();
        this._router.navigate(['tournaments/list']);
      },
      error: (err) => {
        this._messageService.add({severity:'error', summary:'Echec', detail: err.error});
      },
    });
  }

  editT(){
    this._dialoRef.close();
    this._router.navigate(['tournaments/edit/', this.tournament.id]);
  }

  getTCats() : string[]{
    let result : string[] = [];
    this.tournament.category.forEach((cat) => {
      result.push(Category[cat]);
    });
    return result;
  }

  getTStatus() : string{
    return (Status[this.tournament.status]);
  }
}

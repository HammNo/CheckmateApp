import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Utils from 'src/app/utils/utils';
import { Category } from '../../enums/category.enum';
import { TournamentsApiService } from '../../services/tournaments-api.service';
import { TounamentValidators } from '../../validators/tournamentValidators.validator';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  host: {'class': 'subContentApp'}
})
export class AddComponent implements OnInit {

  fg! : FormGroup;

  categoryOptions : any[] = Utils.enumToSelectInt(Category);

  constructor(
    private tournamentsService: TournamentsApiService,
    private builder : FormBuilder,
    private router : Router,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.fg = this.builder.group({
      name : [null, Validators.required],
      location : [],
      minPlayers : [null, [Validators.required, Validators.min(2), Validators.max(32)]],
      maxPlayers : [null, [Validators.required, Validators.min(2), Validators.max(32)]],
      minElo : [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      maxElo : [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      category : [null, Validators.required],
      womenOnly : [false],
      timeToRegister : [null, [Validators.required, Validators.min(1)]]
    },{validators :  [TounamentValidators.greaterThan('minPlayers', 'maxPlayers'), TounamentValidators.greaterThan('minElo', 'maxElo')]});
  }


  add(){
    this.tournamentsService.add(this.fg.value).subscribe({
      next: (data) => {
        this._messageService.add({severity:'success', summary:'Réussite', detail:"Le tournoi a été ajouté"});
        this.router.navigate(['tournaments/list']);
      },
      error: (error) => {
        this._messageService.add({severity:'error', summary:'Echec', life: 5000, detail: error.error});
      },
    });
  }

  fgTextControl(ctrlName : string):  string{
    let textError : string = "";
    if(ctrlName == "maxPlayers"){
      if(this.fg.errors?.['maxPlayers']) textError += "Le nombre de joueurs max doit être supérieur ou égal au nombre de joueurs min<br>"
    }
    if(ctrlName == "maxElo"){
      if(this.fg.errors?.['maxElo']) textError += "L'Elo max doit être supérieur ou égal au Elo min<br>"
    }
    let ctrl : AbstractControl = this.fg.controls[ctrlName];
    if(ctrl.errors){
      if(ctrl.errors['required']){
        textError += "Ce champ est requis<br>";
      }
      if(ctrl.errors['min']){
        textError += "La valeur minimum est de " + ctrl.errors['min'].min + "<br>";
      }
      if(ctrl.errors['max']){
        textError += "La valeur maximum est de " + ctrl.errors['max'].max + "<br>";
      }
    }
    return textError;
  }

}

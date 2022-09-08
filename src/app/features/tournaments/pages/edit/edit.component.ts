import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Utils from 'src/app/utils/utils';
import { Category } from '../../enums/category.enum';
import { Tournament } from '../../models/tournament.model';
import { TournamentsApiService } from '../../services/tournaments-api.service';
import { TounamentValidators } from '../../validators/tournamentValidators.validator';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  host: {'class': 'subContentApp'}
})
export class EditComponent implements OnInit {

  fg! : FormGroup;
  tournament! : Tournament;
  categoryOptions : any[] = Utils.enumToSelectInt(Category);

  constructor(
    private _ar: ActivatedRoute,
    private _builder : FormBuilder,
    private _tournamentsService : TournamentsApiService
  ) { }

  ngOnInit(): void {
    this.fg = this._builder.group({
      name : [],
      location : [],
      minPlayers : [null, [Validators.min(2), Validators.max(32)]],
      maxPlayers : [null, [Validators.min(2), Validators.max(32)]],
      minElo : [null, [Validators.min(0), Validators.max(3000)]],
      maxElo : [null, [Validators.min(0), Validators.max(3000)]],
      category : [],
      womenOnly : [],
      // timeToRegister : [this.tournament., [Validators.required, Validators.min(1)]]
    },{validators :  [TounamentValidators.greaterThan('minPlayers', 'maxPlayers'), TounamentValidators.greaterThan('minElo', 'maxElo')]});
    let tournamentId = this._ar.snapshot.params['id'];
    this._tournamentsService.getATournament(tournamentId).subscribe({
      next: (data: Tournament) => {
        this.tournament = data;
        this.fg.controls['name'].setValue(this.tournament.name);
        this.fg.controls['location'].setValue(this.tournament.location);
        this.fg.controls['minPlayers'].setValue(this.tournament.minPlayers);
        this.fg.controls['maxPlayers'].setValue(this.tournament.maxPlayers);
        this.fg.controls['minElo'].setValue(this.tournament.minElo);
        this.fg.controls['maxElo'].setValue(this.tournament.maxElo);
        this.fg.controls['category'].setValue(this.tournament.category);
        this.fg.controls['womenOnly'].setValue(this.tournament.womenOnly);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  edit(){
    // this._tournamentsService.add(this.fg.value).subscribe({
    //   next: (data) => {
    //     this._messageService.add({severity:'success', summary:'Réussite', detail:"Le tournoi a été ajouté"});
    //     this.router.navigate(['tournaments/list']);
    //   },
    //   error: (error) => {
    //     this._messageService.add({severity:'error', summary:'Echec', life: 5000, detail: error.error});
    //   },
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { Gender } from 'src/app/core/enums/gender.enum';
import { MembersApiService } from 'src/app/features/members/services/members-api.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  host: {'class': 'subContentApp'}
})
export class AddComponent implements OnInit {

  fg! : FormGroup;
  genderOptions : any[] = Utils.enumToSelectInt(Gender);

  constructor(
    private membersService: MembersApiService,
    private builder : FormBuilder,
    private router : Router,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.fg = this.builder.group({
      nickname : [null, Validators.required, [(c:any) => this.isUniqueNickname(c)]],
      email : [null, [Validators.required, Validators.email]],
      birthdate : [null, Validators.required],
      gender : [null, Validators.required],
      elo : [null, [Validators.min(0), Validators.max(3000)]]
    })
  }

  isUniqueNickname(control: AbstractControl): Observable<ValidationErrors | null> {
    if(!control.value) {
      return of(null);
    }
    return this.membersService.existsNickname(control.value)
      .pipe(
        map(() => ({ notUnique: true })),
        catchError(() => of(null)),
      )
  }

  add(){
    this.membersService.add(this.fg.value).subscribe({
      next: (data) => {
        this._messageService.add({severity:'success', summary:'Réussite', detail:"Le membre a été ajouté"});
        this.router.navigate(['members/list']);
      },
      error: (err) => {
        this._messageService.add({severity:'error', summary:'Echec', life: 5000, detail: err.error});
      },
    });
    console.log(this.fg.value);
  }

  fgTextControl(ctrlName : string):  string{
    let textError : string = "";
    let ctrl : AbstractControl = this.fg.controls[ctrlName];
    console.log(ctrl.errors);
    if(ctrl.errors){
      if(ctrl.errors['required']){
        textError += "Ce champ est requis<br>";
      }
      if(ctrl.errors['email']){
        textError += "L'adresse mail doit suivre le format xxxx@xxx <br>";
      }
      if(ctrl.errors['min']){
        textError += "La valeur minimum est de " + ctrl.errors['min'].min + "<br>";
      }
      if(ctrl.errors['max']){
        textError += "La valeur maximum est de " + ctrl.errors['max'].max + "<br>";
      }
      if(ctrl.errors['notUnique']){
        textError += "Le pseudo est déjà alloué à un autre membre <br>";
      }
    }
    return textError;
  }
}

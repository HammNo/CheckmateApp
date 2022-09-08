import { Component, OnChanges, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tournament } from '../../models/tournament.model';
import { TQuery } from '../../models/tQuery.model';
import { TournamentsApiService } from '../../services/tournaments-api.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {'class': 'subContentApp'}
})
export class ListComponent implements OnInit {

  tournamentsList! : Tournament[];

  constructor(
    private tournamentsService: TournamentsApiService,
    private _messageService: MessageService,
    private _dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getDefault();
  }

  getDefault(){
    let searchQuery : TQuery = new TQuery();
    this.get(searchQuery);
  }

  get(searchQuery : TQuery) {
    this.tournamentsService.get(searchQuery).subscribe({
      next: (data: Tournament[]) => {
        this.tournamentsList = [];
        data.forEach((tournament: Tournament) => {
          this.tournamentsList.push(tournament);
        });
      },
    });
  }

  remove(id: number) {
    this.tournamentsService.delete(id).subscribe({
      next: (data) => {
        this._messageService.add({severity:'success', summary:'Réussite', detail:"Le tournoi a été supprimé"});
        this.getDefault();
      },
      error: (err) => {
        this._messageService.add({severity:'error', summary:'Echec', detail: err.error});
      },
    });
  }

  openDetails(id : number) {
    let tournament : Tournament | undefined = this.tournamentsList.find(t => t.id == id);
    if(tournament){
      let dynamicDialogRef : DynamicDialogRef = this._dialogService.open(DetailsComponent, {
        width: '500px',
        // height: '450px',
        data : tournament
      });
      dynamicDialogRef.onClose.subscribe(() => {
        this.getDefault();
      });
    }
  }

}

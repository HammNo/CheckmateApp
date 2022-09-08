import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/core/enums/role.enum';
import { Member } from 'src/app/core/models/member.model';
import { MembersApiService } from 'src/app/features/members/services/members-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {'class': 'subContentApp'}
})
export class ListComponent implements OnInit {

  membersList!: Member[];
  roles = Role;

  constructor(
    private membersService: MembersApiService,
    private _messageService : MessageService
    ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.membersService.get().subscribe({
      next: (data: Member[]) => {
        this.membersList = [];
        data.forEach((member: Member) => {
          this.membersList.push(member);
        });
        console.log(this.membersList);
      },
    });
  }

  remove(id: number) {
    this.membersService.delete(id).subscribe({
      next: (data) => {
        this._messageService.add({severity:'success', summary:'Réussite', detail:"Le membre a été supprimé"});
        this.get();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

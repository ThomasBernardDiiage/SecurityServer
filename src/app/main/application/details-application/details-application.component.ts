import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetApplicationsDto } from 'src/app/models/dtos/request/GetApplicationsDto.interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteApplicationDialogComponent } from 'src/app/shared/delete-application-dialog/delete-application-dialog.component';
import { EventService } from 'src/app/shared/events-services/EventService';
@Component({
  selector: 'app-details-application',
  templateUrl: './details-application.component.html',
  styleUrls: ['./details-application.component.scss'],
})
export class DetailsApplicationComponent implements OnInit {
  constructor(public dialog: MatDialog, private eventService: EventService) {}

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteApplicationDialogComponent, {
      data: this.selectedApp,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        // supprimer l'élément
        this.eventService.emit('deletedApplication', this.selectedApp);
      }
    });
  }

  ngOnInit(): void {}

  @Input()
  selectedApp!: GetApplicationsDto;
}

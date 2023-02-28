import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../../providers/application.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateApplicationDialogComponent } from 'src/app/shared/create-application-dialog/create-application-dialog.component';
import { Application } from 'src/app/models/application.interface';
import { GetApplicationsDto } from 'src/app/models/dtos/request/GetApplicationsDto.interface';
import { EventService } from 'src/app/shared/events-services/EventService';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  applications$!: GetApplicationsDto[];

  constructor(
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    private eventService: EventService
  ) {}

  @Input()
  selectedApplication!: GetApplicationsDto;
  color = '';

  ngOnInit() {
    this.applicationService.getApps().subscribe((app) => {
      this.applications$ = app;
    });

    this.dialog.afterAllClosed.subscribe(() => {});

    this.eventService.on('deletedApplication').subscribe((eventData) => {
      //Make HttpCall
      const appId = eventData.data.id;

      this.applications$ = this.applications$.filter(
        (e: GetApplicationsDto) => e.id != appId
      );
    });
  }

  createApplication(): void {
    let dialogRef = this.dialog.open(CreateApplicationDialogComponent, {
      closeOnNavigation: true,
    });

    dialogRef.componentInstance.onNewApplication.subscribe((application) => {
      const app: GetApplicationsDto = {
        applicationName: application.applicationName,
        applicationSecret: application.applicationSecret,
        id: 0,
      };
      this.applications$.push(app);
    });
  }

  onCreateApplication(): void {
    this.dialog.closeAll();
  }

  onApplicationClick(application: GetApplicationsDto): void {
    this.selectedApplication = application;
  }
}

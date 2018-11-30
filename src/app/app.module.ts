import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { PollService } from './services/poll.service';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule} from '@angular/material';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollSummaryComponent } from './poll-summary/poll-summary.component';
import { PollEditComponent } from './poll-edit/poll-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PollDetailsComponent
  },
  {
    path: 'list',
    component: PollDetailsComponent
  },
  {
    path: 'create',
    component: PollCreateComponent
  },
  {
    path: 'summary',
    component: PollSummaryComponent
  },
  {
    path: 'edit/:id',
    component: PollEditComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PollDetailsComponent,
    PollCreateComponent,
    PollSummaryComponent,
    PollEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }

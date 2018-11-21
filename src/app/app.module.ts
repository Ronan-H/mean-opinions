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

const appRoutes: Routes = [
  {
    path: 'list',
    component: PollDetailsComponent
  },
  {
    path: 'create',
    component: PollCreateComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PollDetailsComponent,
    PollCreateComponent
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

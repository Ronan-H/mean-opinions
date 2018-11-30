import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})
export class PollCreateComponent implements OnInit {

  constructor(private service:PollService) { }

  onAddPoll(form: NgForm) {
    // ensure user can't submit invalid form by exiting the method
    if (!form.valid) return;

    // pass the form on to the poll service
    this.service.addPoll(
      form.value.title,
      form.value.description,
      form.value.optionA,
      form.value.optionB,
      form.value.aWinText,
      form.value.bWinText
    ).subscribe();
    
    // reset the form to allow the user to create another poll
    form.resetForm();
  }

  ngOnInit() {}

}

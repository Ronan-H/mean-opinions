import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router/src/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import { PollService } from '../services/poll.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class PollEditComponent implements OnInit {
  // poll to edit
  poll : any = [];
  
  constructor(private router:Router, private route: ActivatedRoute, private service:PollService) { }

  ngOnInit() {
    // load in poll data to be edited
    this.service.getPoll(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.poll = data;
    });
  }
  onEditPoll(form: NgForm) {
    // ensure user can't submit invalid form by exiting the method
    if (!form.valid) return;

    // pass the form on to the poll service
    this.service.updatePoll(this.poll._id,
      form.value.title,
      form.value.description,
      form.value.optionA,
      form.value.optionB,
      this.poll.aVotes,
      this.poll.bVotes,
      form.value.aWinText,
      form.value.bWinText).subscribe(() =>
    {
      // go back to the poll listing
      this.router.navigate(['/list']);
    });
  }

}

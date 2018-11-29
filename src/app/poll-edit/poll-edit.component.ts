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
  poll : any = [];
  
  constructor(private router:Router, private route: ActivatedRoute, private service:PollService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.getPoll(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.poll = data;
      console.log(this.poll);
    });
  }
  onEditPoll(form: NgForm) {
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
      this.router.navigate(['/list']);
    });
  }

}

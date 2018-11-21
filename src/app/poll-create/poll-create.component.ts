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

  onAddPost(form: NgForm) {

    this.service.addPost(
      form.value.title,
      form.value.description,
      form.value.optionA,
      form.value.optionB
    ).subscribe();
    
    console.log(form.value);
    form.resetForm();
  }


  ngOnInit() {



  }

}

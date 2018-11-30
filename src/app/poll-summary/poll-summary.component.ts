import { Component, OnInit, Input } from '@angular/core';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-summary',
  templateUrl: './poll-summary.component.html',
  styleUrls: ['./poll-summary.component.css']
})
export class PollSummaryComponent implements OnInit {
  // list of polls to summarise
  polls: any = null;
  // total number of votes for all polls
  totalVotes: number;

  constructor(private ps:PollService){}

  ngOnInit(){
    this.ps.getPostsData().subscribe(data => {
        // load in polls from service
        this.polls = data;

        // calculate total votes for all polls
        this.totalVotes = 0;
        for (var i = 0; i < this.polls.length; i++) {
          this.totalVotes += this.polls[i].aVotes + this.polls[i].bVotes;
        }
    });
  }

}

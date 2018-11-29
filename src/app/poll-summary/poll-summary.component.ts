import { Component, OnInit, Input } from '@angular/core';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-summary',
  templateUrl: './poll-summary.component.html',
  styleUrls: ['./poll-summary.component.css']
})
export class PollSummaryComponent implements OnInit {
  polls: any = null;
  totalVotes: number;

  constructor(private ps:PollService){}

  ngOnInit(){
    //this.posts = this.ps.getPosts();
    this.ps.getPostsData().subscribe(data => {
        this.polls = data;

        this.totalVotes = 0;

        for (var i = 0; i < this.polls.length; i++) {
          this.totalVotes += this.polls[i].aVotes + this.polls[i].bVotes;
        }
    });
  }

}

import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import {PostService} from '../services/post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})

export class PostDetailsComponent implements OnInit, AfterViewInit {
  // lines regarding canvas use in Angular taken from StackOverflow question
  //@ViewChild('statCanvas') statCanvas: ElementRef;
  @ViewChildren('statCanvas', {read: ElementRef})
  // list of bar chart canvases (1 for each poll)
  private canvases: QueryList<ElementRef>;
  private context: CanvasRenderingContext2D;
  
  posts: any = [];

  constructor(private ps:PostService){}

  ngOnInit(){
    //this.posts = this.ps.getPosts();
    this.ps.getPostsData().subscribe(data => {
        this.posts = data;
    });
  }

  ngAfterViewInit() {
    // fix for "this" not working in lambda function
    let selfRef = this;

    // create code to run when the bar char canvases are changed

    // (without this lambda function, because of the ngIf, the canvases
    // may not exist yet)
    this.canvases.changes.subscribe(() =>
      {
        this.canvases.forEach((canvas, index) => {
          let posts = selfRef.posts;
          let poll = posts[index];

          // get the canvas element for drawing
          this.context = (<HTMLCanvasElement>canvas.nativeElement).getContext('2d');

          let ctx: CanvasRenderingContext2D = this.context;

          // function to draw the bar char bars
          function drawBars() {
            let width: number = ctx.canvas.width;
            let height: number = ctx.canvas.height;

            let barWidth: number = Math.round(width / 3.5);
            // the maximum height a bar can be (when it represents the
            // higher voted option)
            let maxBarHeight: number = Math.round(height * 0.8);

            // number of votes for each option
            let aVotes: number = poll.aVotes;
            let bVotes: number = poll.bVotes;

            // height of each bar, in pixels
            let aBarHeight: number;
            let bBarHeight: number;

            if (aVotes == 0 && bVotes == 0) {
              // no votes for either; should show no bars (ie. 0 height)
              aBarHeight = bBarHeight = 0;
            }
            else {
              if (aVotes > bVotes) {
                // option A has more votes; option A should have a full height
                // bar and option B should have a proportional height to the
                // vote count, with maxBarHeight as the max
                aBarHeight = maxBarHeight;

                bBarHeight = (bVotes / aVotes) * maxBarHeight;
              }
              else {
                // option B has more votes; inverse of the above
                bBarHeight = maxBarHeight;

                aBarHeight = (aVotes / bVotes) * maxBarHeight;
              }
            }

            // set bar color
            ctx.fillStyle = "red";

            // draw bars, with aesthetic spacing (half a bar's width between
            // the other bar and the edges)
            let aBarX = barWidth / 2;
            let bBarX = barWidth * 2;
            let aBarY = (height - aBarHeight);
            let bBarY = (height - bBarHeight);
            ctx.fillRect(aBarX, aBarY, barWidth, aBarHeight);
            ctx.fillRect(bBarX, bBarY, barWidth, bBarHeight);

            // draw options above bars
            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";

            ctx.fillText(poll.optionA, aBarX + (barWidth / 2), aBarY - 5);
            ctx.fillText(poll.optionB, bBarX + (barWidth / 2), bBarY - 5);
          }

          drawBars();
        });
      });
  }

  // below two functions call corresponding functions in the
  // service class and refresh the page

  onDelete(id:String){
    console.log("Delete called "+ id);
    this.ps.deletePost(id).subscribe(() =>
    {
        this.ngOnInit();
    })
  }

  onVote(id: String, option: String) {
    console.log("Vote for called "+ id + ", option " + option);
    this.ps.addVoteFor(id, option).subscribe(() =>
    {
      this.ngOnInit();
    })
  }
}

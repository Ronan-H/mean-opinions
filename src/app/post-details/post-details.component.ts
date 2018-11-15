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

    this.canvases.changes.subscribe(() =>
      {
        this.canvases.forEach((canvas, index) => {
          this.context = (<HTMLCanvasElement>canvas.nativeElement).getContext('2d');

          let ctx: CanvasRenderingContext2D = this.context;

          function drawBars() {
            let width: number = ctx.canvas.width;
            let height: number = ctx.canvas.height;

            let barWidth: number = Math.round(width / 3.5);
            let maxBarHeight: number = Math.round(height * 0.8);

            let aVotes: number = selfRef.posts[index].aVotes;
            let bVotes: number = selfRef.posts[index].bVotes;

            let aBarHeight: number;
            let bBarHeight: number;

            if (aVotes == 0 && bVotes == 0) {
              aBarHeight = bBarHeight = 0;
            }
            else {
              if (aVotes > bVotes) {
                aBarHeight = maxBarHeight;

                bBarHeight = (bVotes / aVotes) * maxBarHeight;
              }
              else {
                bBarHeight = maxBarHeight;

                aBarHeight = (aVotes / bVotes) * maxBarHeight;
              }
            }

            ctx.fillStyle = "red";

            ctx.fillRect(barWidth / 2, (height - aBarHeight), barWidth, aBarHeight);
            ctx.fillRect(barWidth * 2, (height - bBarHeight), barWidth, bBarHeight);
          }

          drawBars();
        });
      });
  }

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

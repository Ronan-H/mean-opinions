import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }
  
  getPostsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts");
  }

  // used a HTTP request to add a poll using a POST request
  addPost(title: string,
    description: string,
    optionA: string,
    optionB: string,
    aWinText: string,
    bWinText: string): Observable<any> {
    const post: Poll = {
      title: title,
      description: description,
      optionA: optionA,
      optionB: optionB,
      aVotes: 0,
      bVotes: 0,
      aWinText: aWinText,
      bWinText: bWinText
    };
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }

  addVoteFor(id: String, option: String) {
    return this.http.get("http://localhost:8081/api/posts/vote/" + id + "/" + option);
  }

  getPoll(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/"+id);
  }

  updatePoll(id: string,
    title: string,
    description: string,
    optionA: string,
    optionB: string,
    aVotes: number,
    bVotes: number,
    aWinText: string,
    bWinText: string): Observable<any> {
      
    const poll: Poll = {
      title: title,
      description: description,
      optionA: optionA,
      optionB: optionB,
      aVotes: aVotes,
      bVotes: bVotes,
      aWinText: aWinText,
      bWinText: bWinText
    };
    
  return this.http.put("http://localhost:8081/api/posts/"+id, poll);
}

}

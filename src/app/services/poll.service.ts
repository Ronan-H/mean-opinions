import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }
  
  // retrieve data for all polls
  getPollsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/polls");
  }

  // used a HTTP request to add a poll using a POST request
  addPoll(title: string,
    description: string,
    optionA: string,
    optionB: string,
    aWinText: string,
    bWinText: string): Observable<any> {
    const poll: Poll = {
      title: title,
      description: description,
      optionA: optionA,
      optionB: optionB,
      aVotes: 0,
      bVotes: 0,
      aWinText: aWinText,
      bWinText: bWinText
    };
    return this.http.post("http://localhost:8081/api/polls", poll);
  }

  // delete poll from the database
  deletePoll(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/polls/"+id);
  }

  // increment vote count by 1 for a certain poll (for either option a or b)
  addVoteFor(id: String, option: String) {
    return this.http.get("http://localhost:8081/api/polls/vote/" + id + "/" + option);
  }

  // get a specific poll from the database
  getPoll(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/polls/"+id);
  }

  // update a poll, with new details
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
    
  return this.http.put("http://localhost:8081/api/polls/"+id, poll);
}

}

import { Injectable } from '@angular/core';
import {Tweet} from '../Structs/tweetClass';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TweetsService {

  private tweetUrl = 'api/tweets';
  constructor(
    private http: HttpClient
    //Add another service here if you want
  ) { }

  
  // getNumTweets(handle: string, startTime:Date, endTime:Date) : Observable<Tweet[]> {
  //   const url = `${this.tweetUrl}/students/${handle}`;
  //   return this.http.get<Tweet[]>(url).pipe(
  //     catchError(this.handleError('getTweets', []))
  //   );
  // }
  

  getTweets(handle: string, startTime: Date, endTime: Date, hashtags: string[], reply: boolean, retweet: boolean ) : Observable<Tweet[]> {
    var queries = new Array();
    if (handle != "")
    {
      queries.push(`handle=${handle}`)
    }
    if (startTime != null)
    {
      queries.push(`startTime=${startTime}`);
    }
    if (endTime != null)
    {
      queries.push(`endTime=${endTime}`);
    }
    if (hashtags.length > 0)
    {
      queries.push(`hashtags=${hashtags.join(",")}`);
    }
    if (!reply)
    {
      queries.push(`reply=${reply}`);
    }
    if (!retweet)
    {
      queries.push(`retweet=${retweet}`);
    }
    const url = `${this.tweetUrl}?${queries.join("&")}`;
    return this.http.get<Tweet[]>(url).pipe(
      catchError(this.handleError('getTweets', []))
    );
  }





  addTweet(tweet: Tweet) : Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, tweet, httpOptions).pipe(
      catchError(this.handleError<Tweet>('addTweet')));
  }


  addTweets(tweets: Tweet[]) {
    let objArr = new Array<Object>();
    let promise = new Promise((resolve, reject) =>{
      for (let t of tweets) {
        this.http.post<Tweet>(this.tweetUrl, t, httpOptions)
          .toPromise()
          .then(twt => {
            console.log(twt);
            objArr.push(t);
            resolve();
          });
      }
      return promise;
    });
  }


  private log(message: string) {
    // add log messaging here
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

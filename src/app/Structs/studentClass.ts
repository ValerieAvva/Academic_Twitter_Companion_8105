import {Tweet} from './tweetClass';
import {StudentService} from '../services/student.service';

export class Student {
  id: string;
  name : string;
  handle: string;
  section: string;
  courseNum: number;
  tweets: Tweet[];
  totTweets: number;
  totRetweets: number;
  totLikes: number;
  topicDist: Array<String>;
  topicDistNum: number[];

  constructor(name: string, handle: string) {
    this.name = name;
    this.handle = handle;
    this.topicDist = ['ERR: No Topics Assigned'];
    this. topicDistNum = [404];
    this.totRetweets = 0;
    this.totTweets = 0;
    this. totLikes = 0;
  }
}

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
    this.topicDist = ['#2110ctv', 'HuckleBerry', 'Research'];
    this. topicDistNum = [5, 10, 30];
    this.totRetweets = 21;
    this.totTweets = 11;
    this. totLikes = 13;
  }
}

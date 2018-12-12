import {Student} from './studentClass';

export class Section {
  id: number;
  name: string;
  courseNum: number;
  roster: Array<Student>;
  topics: Array<String>;
  topicCounts: Array<number>;
  tweets: number;
  likes: number;
  retweets: number;
  startDate: string;
  endDate: string;
  uid: string;

  constructor(name: string, coursNum: number,  uid: string, topics: Array<String>, startDate: Date, endDate: Date, roster?: Array<Student>) {
    this.name = name;
    this.courseNum = coursNum;
    this.roster = roster;
    this.topics = topics;
    this.uid = uid;
    this.startDate = startDate.toString();
    this.endDate = endDate.toString();
  }
}


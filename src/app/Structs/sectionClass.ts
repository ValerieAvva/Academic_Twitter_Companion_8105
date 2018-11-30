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

  constructor(name: string, coursNum: number,topics: Array<String>, roster?: Array<Student>) {
    this.name = name;
    this.courseNum = coursNum;
    this.roster = roster;
    this.topics = topics;
  }
}


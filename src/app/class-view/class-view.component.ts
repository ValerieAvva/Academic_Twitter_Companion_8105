import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Section} from '../Structs/sectionClass';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from '../services/section.service';
import { Location} from '@angular/common';
import {Student} from '../Structs/studentClass';
import {StudentService} from '../services/student.service';
import {FormControl, Validators} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Tweet } from '../Structs/tweetClass';
import { TweetsService } from '../services/tweets.service';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})
export class ClassViewComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          steps : 10,
          // stepValue : 10,
          // max : 10000,
        }
      }]
    }
  };
  public barChartLabels: string[] = ['Tweets', 'Retweets', 'Likes'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[] = [
    {data: [103, 200, 90]}
  ];

  section: Section;
  students: Student[];
  studentSelected: Student;
  tweets: Tweet[];
  


  public doughnutChartLabels:string[];
  public doughnutChartData: number[] = [1, 1, 1];
  public doughnutChartType:string = 'doughnut';


  emptyValidation = new FormControl([Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private studentService: StudentService,
    private tweetService : TweetsService,
    private location: Location
  ) { }

   ands = {
    labels: ['2013-02-08T09', '2013-02-09T09', '2013-02-10T09', '2013-02-11T09', '2013-02-12T09', '2013-02-13T09', '2013-02-14T09'],
    datasets: [{
      label: 'Num of Tweets',
      data: [1, 3, 4, 2, 1, 4, 2],
    }]
  };
  dateCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  timeline = false;
  stuCount = 0;

  ngOnInit() {
    this.getSection();
  }

  getSection(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.sectionService.getSection(id)
      .subscribe(section => {
        this.section = section;
        console.log(section);
        console.log('got section');
        console.log(section.name);
        console.log('Students list');
        console.log(section.tweets + " rt " + section.retweets + " l " + section.likes)
        section.tweets = 0;
        section.retweets = 0;
        section.likes = 0;
        
        console.log("topic list")
        this.doughnutChartLabels = this.section.topics as string[];
        this.doughnutChartData = new Array<number>(this.doughnutChartLabels.length);
        var i:number;
        for (i=0; i<this.doughnutChartData.length;i++) {
          this.doughnutChartData[i] = 0;
        }
        console.log(this.doughnutChartLabels)
        // this.doughnutChartData = this.section.topicCounts;
        // uncomment ^ and delete next block of code once class has this data
        
        
        
        this.studentService.getStudents(section.courseNum).subscribe(students => {
          this.students = students as Student[];
          let tweets:Tweet[] = []
          for (let student of this.students) {
            // section.tweets += student.totTweets;
            // section.retweets += student.totRetweets;
            // section.likes += student.totLikes;
            console.log(student)
            this.tweetService.getTweets(student.handle, new Date(0), new Date(), [], true, true)
            .subscribe(ts => {
              tweets = tweets.concat(ts);
              this.updateNumbers(ts);
              this.tweets = tweets;
              this.tweets.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
              // console.log('tweets received');
              // console.log(this.tweets);
            });
          }
          // this.barChartData = [
          //   {data: [section.tweets, section.retweets, section.likes]}
          // ];
        });

      });
  }

  updateNumbers(tweets:Tweet[]) : void {
    // time graph update
    // this.tweets = tweets;
    this.stuCount += 1
    let startDate = new Date(this.section.startDate).getTime();
    let endDate = new Date(this.section.endDate).getTime();

    let slice = (endDate - startDate)/14
    var i:number;
    let labels = [];
    // let dateCounts = [];
    for (i=0; i<14;i++) {
      labels.push(new Date(startDate + i*slice).toString())
      // dateCounts.push(0);
    }
    // console.log(labels)

    // topic data
    let data = [];
    for (let label of this.doughnutChartLabels) {
      data.push(0);
    }
    
    for (let tweet of tweets) {
      //hashtag number update
      for (let ht of tweet.hashtags) {
        if (this.doughnutChartLabels.includes(ht.replace('#', ''))) {
          data[this.doughnutChartLabels.indexOf(ht.replace('#', ''))] += 1
        }
      }
      // console.log(this.section.tweets  + " rt: " + tweet.retweets + " likes: " +  tweet.likes)

      this.section.tweets += 1;
      if (tweet.retweets) {
        this.section.retweets += tweet.retweets;
      }
      if (tweet.likes) {
        this.section.likes += tweet.likes;
      }
      // console.log(this.section.tweets  + " rt: " + this.section.retweets + " likes: " +  this.section.likes)

      //timeline
      // var d:number = new Date(tweet.year, tweet.month, tweet.day).getTime()
      var d:number = new Date(tweet.timestamp).getTime()
      this.dateCounts[Math.floor((d-startDate)/slice)] +=1;
    }
    // this.doughnutChartData = data;
    // console.log(this.dateCounts)
    this.barChartData = [
      {data: [this.section.tweets, this.section.retweets, this.section.likes]}
    ];

    this.ands = {
      labels: labels,
      datasets: [{
        label: 'Num of Tweets',
        data: this.dateCounts,
      }]
    };
    this.timeline = false;
    if (this.stuCount == this.students.length) {
      this.timeline = true;
      // console.log(this.section.tweets  + " rt: " + this.section.retweets + " likes: " +  this.section.likes)
    }
    
    
    
    
  }

  goBack(): void {
    this.location.back();
  }
}

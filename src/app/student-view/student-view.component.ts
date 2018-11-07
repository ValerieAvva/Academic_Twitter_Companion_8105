import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../Structs/studentClass';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDatepickerModule, MatCheckboxModule} from '@angular/material';
import { Tweet } from '../Structs/tweetClass';
import { TweetsService } from '../services/tweets.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})


export class StudentViewComponent implements OnInit {

  ands = {
    labels: ['2013-02-08T09', '2013-02-09T09', '2013-02-10T09', '2013-02-11T09', '2013-02-12T09', '2013-02-13T09', '2013-02-14T09'],
    datasets: [{
      label: 'Num of Tweets',
      data: [3, 3, 4, 3, 3, 4, 3],
    }]
  };

  private student: Student;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          steps : 10,
          stepValue : 10,
          max : 50,
        }
      }]
    }
  };
  public barChartLabels:string[] = ['Tweets', 'Retweets', 'Likes'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
  public tweets:Tweet[] = [];

  public barChartData:any[] = [
    {data: [0]}
  ];


  public doughnutChartLabels:string[] = ['#2110ctv', 'HuckleBerry', 'Research'];
  public doughnutChartData:number[] = [0,0,0];
  public doughnutChartType:string = 'doughnut';

  constructor(private studentService : StudentService,
              private tweetService : TweetsService,
              private route: ActivatedRoute,
              private matDialog: MatDialog) {}

  ngOnInit() {
    this.getStudent();
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  getStudent() : void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Student view")
    console.log(id);
    this.studentService.getStudent(id)
      .subscribe(student => {
        this.student = student;
        this.barChartData = [{data: [student.totTweets, student.totRetweets, student.totLikes]}];
        // TODO: get doughnutChartLabels from section data - currently student.section doesn't reference section
        // this.doughnutChartLabels = this.student.section.topics;
        this.doughnutChartData = this.student.topicDistNum;
        this.tweetService.getTweets(this.student.handle, new Date(0), new Date(), [], true, true)
            .subscribe(tweets => {
              this.tweets = tweets;
              console.log('tweets received');
              console.log(this.tweets);
            });
        console.log('Student recievedd');
        console.log(student);
      });
    console.log("_____________")
    
  }

  exportData() : void {
    let dialogRef = this.matDialog.open(ExportDialogComponent, {
      width: '250px'
    });
    window.print();
  }
}

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
})

export class ExportDialogComponent {


  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  onClose() : void {
    this.dialogRef.close();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../Structs/sectionClass';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from '../services/section.service';
import { Location} from '@angular/common';
import {Student} from '../Structs/studentClass';
import {StudentService} from '../services/student.service';
import {FormControl, Validators} from '@angular/forms';

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
          stepValue : 10,
          max : 300,
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

  public doughnutChartLabels: String[] = ["topic 1", "topic 2", "topic 3"];
  public doughnutChartData: number[] = [13, 38, 23];
  doughnutChartDataClone: number[];
  public doughnutChartType = 'doughnut';

  emptyValidation = new FormControl([Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private studentSerivce: StudentService,
    private location: Location
  ) { }

   ands = {
    labels: ['2013-02-08T09', '2013-02-09T09', '2013-02-10T09', '2013-02-11T09', '2013-02-12T09', '2013-02-13T09', '2013-02-14T09'],
    datasets: [{
      label: 'Num of Tweets',
      data: [1, 3, 4, 2, 1, 4, 2],
    }]
  };

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
        
        this.doughnutChartLabels = this.section.topics;
        
        // this.doughnutChartData = this.section.topicCounts;
        // uncomment ^ and delete next block of code once class has this data
        let data = [];
        for (let label of this.doughnutChartLabels) {
          data.push(Math.floor(Math.random() * 100) + 1);
        }
        this.doughnutChartData = data;

        this.barChartData = [
          {data: [section.tweets, section.retweets, section.likes]}
        ];

        //TODO: add data in for tweet timeline distribution
        
        this.studentSerivce.getStudents(section.courseNum).subscribe(students => {
          this.students = students;
          console.log(students);
        });
        console.log(this.students);

      });
  }

  goBack(): void {
    this.location.back();
  }
}

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


  public doughnutChartLabels: string[] = ['#2110ctv', 'HuckleBerry', 'Research'];
  public doughnutChartData: number[] = [35, 46, 72];
  public doughnutChartType = 'doughnut';

  section: Section;
  students: Student[];
  studentSelected: Student;

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
        console.log('got section');
        console.log(section.name);
        console.log('Students list');
        console.log(this.students);

        this.studentSerivce.getStudents(section.courseNum).subscribe(students => {
          this.students = students;
          console.log(students);
        });

      });
  }

  goBack(): void {
    this.location.back();
  }
}

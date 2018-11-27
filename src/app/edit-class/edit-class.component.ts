import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../Structs/sectionClass';
import {SectionService} from '../services/section.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Student} from '../Structs/studentClass';
import {MatSnackBar} from '@angular/material';
import {StudentService} from '../services/student.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  classForm: FormGroup;
  cN: string;
  corN: number;
  section: Section;
  students: Student[];
  inputName: string;
  inputHandle: string;
  topics: Array<String>;

  className:any;
  courseNumber:any;
  inputFileLocation:any;
  inputTopic:any;
  

  emptyValidation = new FormControl([Validators.required]);
  courseNUmValidation = new FormControl([Validators.required, Validators.pattern('[0-9]*')]);

  constructor(private sectionService: SectionService,
              private studentService: StudentService,
              private route: ActivatedRoute,
              private location: Location,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSection();
  }

  getSection() : void {
    const courseNum = +this.route.snapshot.paramMap.get('courseNum');
    this.sectionService.getSection(courseNum)
      .subscribe(section => {
        this.cN = section.name;
        this.corN = section.courseNum
        this.section = section;
        this.studentService.getStudents(section.courseNum).subscribe(students => this.students = students);
        this.topics = this.section.topics;
        console.log('got section');
        console.log(section);
        console.log('Students list');
        console.log(this.students);
      });
  }

  addStudent(name: string, handle: string) : void {
    let stu = new Student(name, handle);
    stu.section = this.section.name;
    stu.courseNum = this.section.courseNum;
    stu.topicDist = this.section.topics;
    this.studentService.addStudent(stu).subscribe(() => this.students.push(stu));
  }

  addTopic(topic : string) {
    this.section.topics.push(topic);
    console.log("TOPIC ADDED");
    console.log(this.section.topics);

    this.sectionService.updateSection(this.section).subscribe();
  }

  deleteTopic(topic: string) {
    const i = this.topics.indexOf(topic);
    this.topics.splice(i, 1);
    this.section.topics = this.topics;
    this.sectionService.updateSection(this.section).subscribe(() => this.snackBar.open('Topic Removed', '', {duration : 500}));
  }

  deleteStudent(student: Student) {
    const i = this.students.indexOf(student);
    let stu = this.students[i];
    this.studentService.deleteStudent(stu).subscribe(() => this.students.splice(i,1));
  }

  deleteSection() : void {
    this.sectionService.deleteSection(this.section).subscribe(() => this.goback());
  }

  goback(): void {
    this.location.back();
  }

  searchFile() : void {
    //doNothing
  }

  addStudentsFromFile():void {
    //doNothing
  }

  getErrorMessage() {
    return this.courseNUmValidation.hasError('required') ? 'Field Cannot Be Empty' :
      this.courseNUmValidation.hasError('pattern') ? 'Field may only contain numbers': '';
  }



}

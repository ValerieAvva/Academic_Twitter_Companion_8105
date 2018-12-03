import { Component, OnInit } from '@angular/core';
import {SectionService} from '../services/section.service';
import {StudentService} from '../services/student.service';
import {Student} from '../Structs/studentClass';
import {Section} from '../Structs/sectionClass';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {bindCallback} from 'rxjs/observable/bindCallback';
import {MatSnackBar, MatTable} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  classForm: FormGroup;
  students : Array<Student>;
  className: string;
  courseNumber: number;
  topics: Array<String>;
  inputName: string;
  inputHandle: string;
  inputTopic: string;
  inputEndDate: Date;
  inputStartDate: Date;

  displayedColumns = ['name', 'handle'];

  sections;
  emptyValidation = new FormControl([Validators.required]);

  courseNUmValidation = new FormControl([Validators.required, Validators.pattern('`')]);

  constructor(private sectionService: SectionService,
              private studentService: StudentService,
              private location: Location,
              public snackbar: MatSnackBar,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.students = new Array<Student>();
    this.topics = new Array<String>();
    this.courseNumber = 180557;
    this.sectionService.getSections().subscribe(sect => this.sections = sect);
  }

  editName(name: string) : void {
    this.className = name;
  }

  addStudent(name: string, handle: string): void {
    const stu = new Student(name, '@'.concat(handle));
    this.students.push(stu);
    this.inputName = '';
    this.inputHandle = '';
  }

  deleteStudent(student: Student) {
    const i = this.students.indexOf(student);

    this.students.splice(i,1);
  }

  addTopic(topic: string) : void {
    this.topics.push(topic);
    this.inputTopic = '';
  }

  deleteTopic(topic: string) : void {
    const i = this.topics.indexOf(topic);
    this.topics.splice(i, 1);
  }

  addStudents() : void{
    //donothing
  }



  searchFile() : void {
    //doNothing
  }

changeListener(files: FileList){
  console.log(files);
  if(files && files.length > 0) {
     let file : File = files.item(0);
       console.log(file.name);
       console.log(file.size);
       console.log(file.type);
       let reader: FileReader = new FileReader();
       reader.readAsText(file);
       reader.onload = (e) => {
          let csv: string = reader.result;
          let values = csv.split(',');
          for (let i = 0; i <values.length/2; i++)
          {
            console.log(values[i], values[i+1]);
            this.addStudent(values[i], values[i+1])
          }
       }
    }
}

  getErrorMessage() {
    return this.courseNUmValidation.hasError('required') ? 'Field Cannot Be Empty' :
      this.courseNUmValidation.hasError('pattern') ? 'Field may only contain numbers': '';
  }

  createSection() : void {
    let addList = new Array<Student>();

    let b = true;
    console.log('Sections gotten');
    console.log(this.sections);

    for(let s of this.sections) {
      if (s.name === this.className) {
        b = false;
      }
    }

    if(this.emptyValidation.valid && this.courseNUmValidation.valid && b) {
      var user = this.afAuth.auth.currentUser;
      console.log("UID", user.uid);
      var sect = new Section(
        this.className,
        this.courseNumber,
        user.uid,
        this.topics,
        );
      this.sectionService.addSection(sect).subscribe(section => {
        console.log('Section Created')
        console.log(section)
        for(let stu of this.students) {
          stu.topicDist = this.topics;
          stu.topicDistNum = Array.apply(null, new Array(this.topics.length)).map(Number.prototype.valueOf,0)
          stu.section = section.name;
          stu.courseNum = section.courseNum;
        }

        this.studentService.addStudents(this.students);
        this.goback();
        } );
    } else {
      this.snackbar.open('Class Name Already Exsists Please A Choose a Different Name', '', {duration: 700});
    }
  }

  goback(): void {
    this.location.back();
  }
}

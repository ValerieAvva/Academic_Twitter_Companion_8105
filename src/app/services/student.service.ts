import { Injectable } from '@angular/core';
import {Student} from '../Structs/studentClass';

import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import {promise} from 'selenium-webdriver';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class StudentService {


  private studentUrl = 'api/students';
  constructor(
    private http: HttpClient
  ) { }

  getStudents (section: number): Observable<any> {
    const url = `${this.studentUrl}/sectionID/${section}`;
    return this.http.get<Student[]>(url).pipe(
      catchError(this.handleError('getStudents', []))
    );
  }

  getStudent (id: string) : Observable<Student> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  updateStudent(student : Student): Observable<any> {
    return this.http.put(this.studentUrl, student, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateStudent'))
      );
  }

  addStudents(students: Student[]) {
    let objArr = new Array<Object>();
    let promise = new Promise((resolve, reject) =>{
      for (let s of students) {
        this.http.post<Student>(this.studentUrl, s, httpOptions)
          .toPromise()
          .then(stu => {
            console.log(stu);
            objArr.push(s);
            resolve();
          });
      }
      return promise;
    });

    // for(let student of students){
    //   this.http.post<Student>(this.studentUrl, student, httpOptions)
    //     .toPromise()
    // }
    // return this.http.post<Student[]>(this.studentUrl, students, httpOptions)
    //   .pipe(
    //     catchError(this.handleError<Student>('addStudents()'))
    //   );
  }

  addStudent (student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student, httpOptions)
      .pipe(
        catchError(this.handleError<Student>('addStudent'))
    );
  }

  deleteStudent (student: Student | string): Observable<Student> {
    console.log(student);
    const id = typeof student == 'string' ? student : student.id;
    const url = `${this.studentUrl}/${id}`;
    console.log(url);
    return this.http.delete<Student>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Student>('deleteStudent'))
    );
  }



  private log(message: string) {
    //log
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

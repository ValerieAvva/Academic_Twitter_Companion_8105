import { Injectable } from '@angular/core';
import {Section} from '../Structs/sectionClass';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Student} from '../Structs/studentClass';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SectionService {

  private sectionUrl = 'api/sections';
  constructor(
    private http: HttpClient
    //Add another service here if you want
  ) { }

  getSections() : Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionUrl)
      .pipe(
        catchError(this.handleError('getSections', []))
      );
  }

  getSection(id: number) : Observable<Section> {
    const url = `${this.sectionUrl}/${id}`;
    return this.http.get<Section>(url).pipe(
      catchError(this.handleError<Section>(`getSection id=${id}`)
    ));
  }

  updateSection(section : Section): Observable<any> {
    return this.http.put(this.sectionUrl, section, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateSection'))
      );
  }

  addSection(section: Section) : Observable<Section> {
    return this.http.post<Section>(this.sectionUrl, section, httpOptions).pipe(
      catchError(this.handleError<Section>('addSection')));
  }

  deleteSection (section: Section | number): Observable<Section> {
    const courseNum = typeof section === 'number' ? section : section.courseNum;
    const url = `${this.sectionUrl}/${courseNum}`;

    return this.http.delete<Section>(url, httpOptions).pipe(
      catchError(this.handleError<Section>('deleteSection'))
    );
  }

  deleteStudent (student: Student | string): Observable<Student> {
    const id = typeof student === 'string' ? student : student.handle;


    const url = `${this.sectionUrl}/roster/${id}`;

    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  private log(message: string) {
    // add log messaging here
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

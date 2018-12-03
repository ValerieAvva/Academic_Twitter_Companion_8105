import { Component, OnInit } from '@angular/core';
import {SectionService} from '../services/section.service';
import {Section} from '../Structs/sectionClass';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sectionService: SectionService,
              public afAuth: AngularFireAuth) { }

  sections: Array<Section>;
  selectedValue: number;

  emptyValidation = new FormControl([Validators.required]);

  ngOnInit() {
    this.getSections();
  }

  getSections() : void {
    var user = this.afAuth.auth.currentUser;

    this.sectionService.getSectionsUser(user.uid)
      .subscribe(
        sections => {
          this.sections = sections;
          console.log('Recieved these sections' + sections);
          for (const sect of sections) {
            console.log(sect);
          }

        });
  }

  gotoSection() : void {

  }

}

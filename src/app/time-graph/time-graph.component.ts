import {Component, AfterViewInit, Input} from '@angular/core';
import { StudentService} from '../services/student.service';
import { SectionService} from '../services/section.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-time-graph',
  templateUrl: './time-graph.component.html',
  styleUrls: ['./time-graph.component.css']
})
export class TimeGraphComponent implements AfterViewInit {
  @Input() dataIn;
  canvas: any;
  ctx: any;

  constructor() { }

  ngAfterViewInit() {
    this.canvas = document.getElementById('timeChart');
    this.ctx = this.canvas.getContext('2d');

    let config = {
      type: 'line',
      data: this.dataIn,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                'millisecond': 'MMM DD HH',
                'second': 'MMM DD HH',
                'minute': 'MMM DD HH',
                'hour': 'MMM DD HH',
                'day': 'MMM DD HH',
                'week': 'MMM DD HH',
                'month': 'MMM DD HH',
                'quarter': 'MMM DD HH',
                'year': 'MMM DD HH',
              }
            }
          }],
          // yAxes : [{
            // ticks: {
            //   steps : 10,
            //   stepValue : 1,
            //   max : 10,
            //   min : 0,
            // }
          // }
          // ]
        },
      }
    };

    let timeChart = new Chart(this.ctx, config);
  }
}

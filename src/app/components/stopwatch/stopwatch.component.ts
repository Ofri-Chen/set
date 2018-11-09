import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  seconds: number = 58;
  constructor() { }

  ngOnInit() {
    setInterval(() => this.seconds += 1, 1000);
  }

}
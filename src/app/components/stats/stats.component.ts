import { Component, OnInit } from '@angular/core';
import {StatisticInterface, StatService} from "../../services/stat.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
   stats = new Array<StatisticInterface>();

  constructor(public statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStats().subscribe(response => {
       this.stats = response.data;
    })
  }

}

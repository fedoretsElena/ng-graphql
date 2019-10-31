import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-screen-mode',
  templateUrl: './screen-mode.component.html',
  styleUrls: ['./screen-mode.component.css']
})
export class ScreenModeComponent implements OnInit {
  mode = false;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
  }

  onChange(value: boolean): void {
    const theme = value ? 'dark' : 'light';

    this.apollo.getClient()
      .writeData({
        data: { theme }
      });
  }
}

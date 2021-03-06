import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() path: string = "";
  @Input() txt: string = "";
  @Input() justify: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

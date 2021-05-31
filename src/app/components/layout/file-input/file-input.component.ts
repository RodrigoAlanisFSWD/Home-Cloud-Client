import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  @Input() error: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

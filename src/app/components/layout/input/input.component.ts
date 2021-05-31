import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder: String = '';
  @Input() error: boolean | undefined = false;
  @Input() control: string = "username";
  @Input() form: any;
  @Input() errorMsg: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

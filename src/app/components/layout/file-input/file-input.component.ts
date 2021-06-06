import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  @Input() error: any = false;
  @Input() control: string = "avatar";
  @Input() errorMsg: string = "";
  @Input() form: any;
  @Input() txt: string = "";

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CloudResponse, CloudService } from 'src/app/core/services/cloud.service';
import { AppState } from 'src/app/core/store/app.state';
import { Item, Type } from 'src/app/core/types/item.model';
import * as CloudActions from '../../../core/store/actions/cloud.actions';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item = {name: "", type: Type.FILE}
  @Input() path: string = "-";
  type: string = "";

  constructor(
    private cloud: CloudService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.type = this.item.type === Type.FILE ? "file" : "dir"
  }

  deleteFile() {
    this.cloud.delete(this.item, this.path, this.type).subscribe((res: CloudResponse) => {
        this.cloud.getItems(this.path).subscribe((res: CloudResponse) => {
          if (res.data) {
            res.data = res.data.map((el: string) => {
              return {
                name: el,
                type: !el.includes(".") ? Type.DIR : Type.FILE
              }
            })
          } else if(!res.data) {
            res.data = [
              {
                name: "",
                type: Type.FILE
              }
            ]
          }

          this.store.dispatch(new CloudActions.SetCloud(res.data));
        })
    });
  }

  enterDir() {
    const newPath = this.path == "-" ? this.path + this.item.name : this.path + "-" + this.item.name
    this.router.navigate(['/home/' + newPath])
    this.cloud.getItems(newPath).subscribe((res: CloudResponse) => {
      if (res.data) {
        res.data = res.data.map((el: string) => {
          return {
            name: el,
            type: !el.includes(".") ? Type.DIR : Type.FILE
          }
        })
      } else if(!res.data) {
        res.data = [
          {
            name: "",
            type: Type.FILE
          }
        ]
      }

      this.store.dispatch(new CloudActions.SetCloud(res.data));
    })
  }

  download() {
    this.cloud.download(this.item, this.path).subscribe(res => {
      const file = new Blob([res.file]);
      FileSaver.saveAs(file, this.item.name)
    })
  }

}

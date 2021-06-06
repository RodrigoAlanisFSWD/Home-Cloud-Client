import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CloudResponse, CloudService } from 'src/app/core/services/cloud.service';
import { AppState } from 'src/app/core/store/app.state';
import { Item, Type } from 'src/app/core/types/item.model';
import { User } from 'src/app/core/types/user.model';
import * as CloudActions from '../../../core/store/actions/cloud.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User;
  public items: Array<Item>;
  public path: string;
  public uploadForm: FormGroup;
  public mkdirForm: FormGroup;
  public mkdirModal: boolean = false;
  public uploadModal: boolean = false;

  constructor(
    private store: Store<AppState>,
    private cloud: CloudService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private router: Router
  ) {
    this.uploadForm = this._fb.group({
      "file": ["", Validators.required]
    })
    this.mkdirForm = this._fb.group({
      "name": ["", Validators.required]
    })
    this.path = "";
    route.params.subscribe((params) => {
      this.path = params["path"]
    })
    this.user = {
      id: "",
      username: "",
      password: "",
      avatar: "",
      created_at: new Date(),
      updated_at: new Date(),
      token: "",
    }
    this.items = [
      {
        name: "",
        type: Type.FILE
      }
    ];
    this.store.select('user').subscribe((user: User) => {
      this.user = user
    });
    this.store.select('cloud').subscribe((cloud: Array<Item>) => {
      this.items = cloud
    })
    this.cloud.getItems(this.path).subscribe((res: CloudResponse) => {
      res.data = res.data.map((el: string) => {
        return {
          name: el,
          type: !el.includes(".") ? Type.DIR : Type.FILE
        }
      })
      this.store.dispatch(new CloudActions.SetCloud(res.data));
    })
  }

  ngOnInit(): void {
  }

  showUploadModal() {
    this.uploadModal = true;
  }

  closeUploadModal() {
    this.uploadModal = false;
  }

  showMkdirModal() {
    this.mkdirModal = true;
  }

  closeMkdirModal() {
    this.mkdirModal = false;
  }

  upload() {
    const form = document.getElementById("upload-form") as HTMLFormElement;
    const data = new FormData(form);
    console.log(data.get("file"));

    this.cloud.upload(data, this.path).subscribe((res: CloudResponse) => {
      this.cloud.getItems(this.path).subscribe((res: CloudResponse) => {
        res.data = res.data.map((el: string) => {
          return {
            name: el,
            type: !el.includes(".") ? Type.DIR : Type.FILE
          }
        })
        this.store.dispatch(new CloudActions.SetCloud(res.data));
        this.uploadModal = false;
      })
    });
  }

  mkdir(data: any) {
    this.cloud.mkdir(data["name"], this.path).subscribe((res: CloudResponse) => {
      this.cloud.getItems(this.path).subscribe((res: CloudResponse) => {
        res.data = res.data.map((el: string) => {
          return {
            name: el,
            type: !el.includes(".") ? Type.DIR : Type.FILE
          }
        })
        this.store.dispatch(new CloudActions.SetCloud(res.data));
        this.uploadModal = false;
      })
    });
  }

  back() {
    const splited: string[] = this.path.split("-");
    let newPath = splited.length >= 3 ? this.path
    .replace(splited[splited.length - 1], "").split("").reverse().join("")
    .replace("-", "").split("").reverse().join("") : this.path.replace(splited[splited.length - 1], "")

    this.router.navigate(['/home/' + newPath])
    this.cloud.getItems(newPath).subscribe((res: CloudResponse) => {
      if (res.data) {
        res.data = res.data.map((el: string) => {
          return {
            name: el,
            type: !el.includes(".") ? Type.DIR : Type.FILE
          }
        })
      } else if (!res.data) {
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

}

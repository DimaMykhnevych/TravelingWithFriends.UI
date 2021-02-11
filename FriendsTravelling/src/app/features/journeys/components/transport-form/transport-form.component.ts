import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss'],
})
export class TransportFormComponent implements OnInit {
  public form: FormGroup;
  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.form = this._builder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
}

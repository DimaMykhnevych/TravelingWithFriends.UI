import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITransportModel } from 'src/app/core/models/transport';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss'],
})
export class TransportFormComponent implements OnInit {
  @Input() public set transport(t: ITransportModel) {
    this._transport = t;
    this.initializeForm(t);
  }
  public get transport(): ITransportModel {
    return this._transport;
  }
  public form: FormGroup;
  private _transport: ITransportModel;
  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.initializeForm(null);
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  private initializeForm(transport: ITransportModel): void {
    this.form = this._builder.group({
      name: new FormControl(transport?.name, [Validators.required]),
      description: new FormControl(transport?.description, [
        Validators.required,
      ]),
    });
  }
}

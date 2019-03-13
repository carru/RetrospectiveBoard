import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PRESET_COLOURS } from '../category/category.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  @Output() addCategory: EventEmitter<any> = new EventEmitter();

  name:string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (!(typeof this.name == 'undefined' || this.name == '')) {
      this.addCategory.emit({
        name: this.name,
        colour: PRESET_COLOURS[Math.floor(Math.random() * PRESET_COLOURS.length)]
      });
      this.name = ''
    }
  }

}

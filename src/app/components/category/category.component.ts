import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category:Category;
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete(category:Category) {
    this.deleteCategory.emit(category);
  }

}

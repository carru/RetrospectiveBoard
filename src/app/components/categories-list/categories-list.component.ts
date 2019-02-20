import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/Category';
import { Topic } from 'src/app/models/Topic';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @Input() categories:Category[];
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  deleteCategoryInList(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopicInCategoryInList(topic:Topic) {
    this.deleteTopic.emit(topic);
  }
}
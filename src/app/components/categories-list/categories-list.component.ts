import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/Category';
import { Topic } from 'src/app/models/Topic';
import { CategoryService } from 'src/app/services/category.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @Input() categories:Category[];
  @Input() totalVotes;
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  votesPerPerson = 3; // default value

  constructor(private categoryService:CategoryService, private socketService:SocketService) { }

  deleteCategoryInList(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopicInCategoryInList(topic:Topic) {
    this.deleteTopic.emit(topic);
  }

  clearCounters() {
    this.totalVotes = 0;
    this.categories.forEach(c => {
      c.points = undefined;
      this.categoryService.updateCategory(c).subscribe( () => {
        this.socketService.notifyDataHasChanged();
      });
    });
  }

  sort() {
    this.categories.sort((a, b) => {
      let aa = (typeof a.points == 'undefined') ? 0 : a.points;
      let bb = (typeof b.points == 'undefined') ? 0 : b.points;
      return bb - aa;
    });
  }
}
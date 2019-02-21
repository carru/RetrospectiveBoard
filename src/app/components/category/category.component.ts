import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/Category';
import { Topic } from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/topic.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category:Category;
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();
  @Output() deleteTopicInCategory: EventEmitter<Topic> = new EventEmitter();

  topics:Topic[];

  constructor(private topicService:TopicService, private categoryService:CategoryService) { }

  ngOnInit() {
    this.topics = this.category.topics;
  }

  onDelete(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopic(topic:Topic) {
    this.deleteTopicInCategory.emit(topic);
  }

  onColourChange(colour:string) {
    this.category.colour = colour;
    this.categoryService.updateCategory(this.category).subscribe();
  }
}

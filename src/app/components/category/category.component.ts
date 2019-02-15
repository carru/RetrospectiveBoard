import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/Category';
import { Topic } from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category:Category;
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();

  topics:Topic[];

  constructor(private topicService:TopicService) { }

  ngOnInit() {
    this.topics = this.category.topics;
  }

  onDelete(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopic(topic:Topic) {
    this.topics = this.topics.filter(t => t.id !== topic.id);
    this.topicService.deleteTopic(topic).subscribe();
  }

}

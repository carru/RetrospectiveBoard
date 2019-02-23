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
  presetColours: string[];

  constructor(private topicService:TopicService, private categoryService:CategoryService) { }

  ngOnInit() {
    this.topics = this.category.topics;
    this.presetColours = ['#90a4ae', '#ff8a65', '#ffd54f', '#aed581', '#4db6ac', '#4fc3f7', '#7986cb', '#ba68c8', '#e57373'];
  }

  onDelete(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopic(topic:Topic) {
    this.deleteTopicInCategory.emit(topic);
  }

  onColourChange(colour:string) {
    this.category.colour = colour;
    this.saveCategory(this.category);
  }

  saveCategory(category:Category) {
    this.categoryService.updateCategory(category).subscribe();
  }

  onPlusOne(category:Category) {
    if (typeof this.category.points == 'undefined') {
      this.category.points = 0;
    }
    this.category.points++;
    this.saveCategory(this.category);
  }
}

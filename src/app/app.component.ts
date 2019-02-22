import { Component, OnInit } from '@angular/core';
import { Topic } from './models/Topic';
import { TopicService } from './services/topic.service';
import { Category } from './models/Category';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uncategorizedTopics:Topic[];
  categories:Category[];

  constructor(private topicService:TopicService, private categoryService:CategoryService) { }

  ngOnInit() {
    this.topicService.getTopics().subscribe(topics => {
      this.uncategorizedTopics = topics.filter(t => t.categoryId == null);
    })
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  createTopic(topic:Topic) {
    this.topicService.addTopic(topic).subscribe(topic => {
      this.uncategorizedTopics.push(topic);
    })
  }

  deleteUncategorizedTopic(topic:Topic) {
    this.uncategorizedTopics = this.uncategorizedTopics.filter(t => t.id !== topic.id);
    this.topicService.deleteTopic(topic).subscribe();
  }

  createCategory(category:Category) {
    this.categoryService.addCategory(category).subscribe(category => {
      this.categories.push(category);
    })
  }

  deleteCategory(category:Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.categoryService.deleteTopicsOfCategory(category).subscribe(c => {
      this.categoryService.deleteCategory(category).subscribe();
    })
  }

  deleteTopicInCategory(topic:Topic) {
    this.topicService.deleteTopic(topic).subscribe();
  }
}
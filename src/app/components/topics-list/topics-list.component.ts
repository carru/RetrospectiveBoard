import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/Topic';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  topics:Topic[];

  constructor(private topicService:TopicService) { }

  ngOnInit() {
    this.topicService.getTopics().subscribe(topics => {
      this.topics = topics.filter(t => t.categoryId == null);
    })
  }

  deleteTopic(topic:Topic) {
    this.topics = this.topics.filter(t => t.id !== topic.id);
    this.topicService.deleteTopic(topic).subscribe();
  }

  addTopic(topic:Topic) {
    this.topicService.addTopic(topic).subscribe(topic => {
      this.topics.push(topic);
    })
  }

}

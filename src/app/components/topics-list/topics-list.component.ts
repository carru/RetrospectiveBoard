import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Topic } from '../../models/Topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  @Input() topics: Topic[];
  @Input() categoryId: number;
  @Input() topicBackground: string;
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  constructor(private topicService:TopicService) {}

  ngOnInit() {
    if (typeof this.topics == 'undefined') {
      this.topics = [];
    }
  }

  deleteTopicInList(topic: Topic) {
    this.topics = this.topics.filter(t => t.id != topic.id);
    this.deleteTopic.emit(topic);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let topic: Topic = event.container.data[event.currentIndex] as unknown as Topic;
      topic.categoryId = this.categoryId;
      this.topicService.updateTopic(topic).subscribe();
    }
  }
}
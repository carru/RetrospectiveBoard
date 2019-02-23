import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  @Input() topic:Topic;
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  onDelete(topic:Topic) {
    this.deleteTopic.emit(topic);
  }

  onClickEdit() {
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Topic } from 'src/app/models/Topic';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent {
  @Output() addTopic: EventEmitter<any> = new EventEmitter();
  text:string;

  onSubmit() {
    this.addTopic.emit({
      text: this.text
    });
  }

}

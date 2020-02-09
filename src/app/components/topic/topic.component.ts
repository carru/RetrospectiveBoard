import { Component, Input, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Topic } from '../../models/Topic';
import { TopicService } from 'src/app/services/topic.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic:Topic;
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();
  
  isEditMode: boolean;

  constructor(private topicService: TopicService, private socketService: SocketService) {}

  ngOnInit() {
    this.isEditMode = false;
  }

  onDelete(topic:Topic) {
    this.deleteTopic.emit(topic);
  }

  @ViewChild("text", { static: false }) textInput: ElementRef;
  onClickEdit() {
    this.toggleEditMode();
    if (this.isEditMode) {
      setTimeout(() => this.textInput.nativeElement.focus(), 0);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    this.topicService.updateTopic(this.topic).subscribe( () => {
      this.toggleEditMode();
      this.socketService.notifyDataHasChanged();
    });
  }

}

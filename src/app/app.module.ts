import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NewTopicComponent } from './components/new-topic/new-topic.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicsListComponent,
    NewTopicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

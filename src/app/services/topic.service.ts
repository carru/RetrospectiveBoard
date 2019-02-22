import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/Topic';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  topicsUrl:string = 'http://localhost:3000/api/topics';

  constructor(private http:HttpClient) { }

  getTopics():Observable<Topic[]> {
    const url:string = this.topicsUrl;
    return this.http.get<Topic[]>(url);
  }

  deleteTopic(topic:Topic):Observable<Topic> {
    const url:string = `${this.topicsUrl}/${topic.id}`;
    return this.http.delete<Topic>(url, httpOptions);
  }

  addTopic(topic:Topic):Observable<Topic> {
    return this.http.post<Topic>(this.topicsUrl, topic, httpOptions);
  }

  updateTopic(topic:Topic):Observable<Topic> {
    const url:string = `${this.topicsUrl}/${topic.id}`;
    return this.http.put<Topic>(url, topic, httpOptions);
  }
}
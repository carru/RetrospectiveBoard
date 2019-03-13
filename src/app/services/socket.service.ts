import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import * as socketIo from 'socket.io-client';

const SERVER_URL = environment.socketUrl;
const DATA_CHANGED_EVENT = 'dataChanged';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public notifyDataHasChanged(): void {
        this.socket.emit(DATA_CHANGED_EVENT);
    }

    public onChangedData(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(DATA_CHANGED_EVENT, () => observer.next());
        });
    }
}
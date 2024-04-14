import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Message } from 'app/layout/common/messages/messages.types';
import {catchError, map, Observable, ReplaySubject, switchMap, take, tap, throwError} from 'rxjs';
import {Message} from "app/layot/common/messages/messages.types";
import {Task} from "app/entity/task";

@Injectable({providedIn: 'root'})
export class MessagesService
{
  private _messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);
  task: Task;
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient)
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for messages
   */
  get messages$(): Observable<Message[]>
  {
    return this._messages.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all messages
   */
 // getAll(): Observable<Message[]>
  getAll(): Observable<any>
  {
   /* return this._httpClient.get<Message[]>('api/common/messages').pipe(
      tap((messages) =>
      {
        this._messages.next(messages);
      }),
    );*/

    /*return this._httpClient.get<Task>("https://localhost:8080/task").subscribe(result => {
      this.task = result;
      console.log(this.task);
    })*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        // 'Authorization': `Bearer ${token}`,
        // 'Authorization': 'Bearer ' + token,
      })
    }


    return this._httpClient.get<Task>("https://localhost:8080/task",httpOptions).pipe(
      tap((task) =>
      {
        this.task = task;
        console.log(task);
      }),
      catchError(this.handleError)
    );

  }

  /**
   * Create a message
   *
   * @param message
   */
  create(message: Message): Observable<Message>
  {
    return this.messages$.pipe(
      take(1),
      switchMap(messages => this._httpClient.post<Message>('api/common/messages', {message}).pipe(
        map((newMessage) =>
        {
          // Update the messages with the new message
          this._messages.next([...messages, newMessage]);

          // Return the new message from observable
          return newMessage;
        }),
      )),
    );
  }

  /**
   * Update the message
   *
   * @param id
   * @param message
   */
  update(id: string, message: Message): Observable<Message>
  {
    return this.messages$.pipe(
      take(1),
      switchMap(messages => this._httpClient.patch<Message>('api/common/messages', {
        id,
        message,
      }).pipe(
        map((updatedMessage: Message) =>
        {
          // Find the index of the updated message
          const index = messages.findIndex(item => item.id === id);

          // Update the message
          messages[index] = updatedMessage;

          // Update the messages
          this._messages.next(messages);

          // Return the updated message
          return updatedMessage;
        }),
      )),
    );
  }

  /**
   * Delete the message
   *
   * @param id
   */
  delete(id: string): Observable<boolean>
  {
    return this.messages$.pipe(
      take(1),
      switchMap(messages => this._httpClient.delete<boolean>('api/common/messages', {params: {id}}).pipe(
        map((isDeleted: boolean) =>
        {
          // Find the index of the deleted message
          const index = messages.findIndex(item => item.id === id);

          // Delete the message
          messages.splice(index, 1);

          // Update the messages
          this._messages.next(messages);

          // Return the deleted status
          return isDeleted;
        }),
      )),
    );
  }

  /**
   * Mark all messages as read
   */
  markAllAsRead(): Observable<boolean>
  {
    return this.messages$.pipe(
      take(1),
      switchMap(messages => this._httpClient.get<boolean>('api/common/messages/mark-all-as-read').pipe(
        map((isUpdated: boolean) =>
        {
          // Go through all messages and set them as read
          messages.forEach((message, index) =>
          {
            messages[index].read = true;
          });

          // Update the messages
          this._messages.next(messages);

          // Return the updated status
          return isUpdated;
        }),
      )),
    );
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    // return Observable. throw(body);
    return throwError(error.message);
  }
}

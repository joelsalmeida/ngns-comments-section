import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';



export type TContent = {
  id: string,
  body: string,
  likes: string[],
  createdAt: string,
  updatedAt: string,
}

export type TUser = {
  id: string,
  username: string
}

export type TCommentResponse = {
  sender: TUser,
  recipient: TUser,
} & TContent


export type TComment = {
  sender: TUser,
  responses: TCommentResponse[],
} & TContent

type TResponse = {
  data: TComment[]
  success: boolean
  message: string
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private http: HttpClient) { }

  getCommentsTimeline(): Observable<TComment[]> {
    return this.http.get<TResponse>(`${environment.nsGnServer}/comment/timeline`).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching comments:', error);
        return of([]);
      })
    );
  }
}


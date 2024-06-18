import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
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

type TPostComment = {
  body: string,
  sender: string,
}

type TPostResponse = {
  comment: string,
  recipient: string,
} & TPostComment

type TPostCommentResponse = {
  success: boolean,
  message: string,
}

type TLikeComment = {
  sender: string,
  comment: string,
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private _commentsBehaviorSubject = new BehaviorSubject<TComment[]>([]);
  private _comments = this._commentsBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCommentsTimeline();
  }

  get comments(): Observable<TComment[]> {
    return this._comments;
  }

  getCommentsTimeline(): void {
    this.http.get<TResponse>(`${environment.nsGnServer}/comment/timeline`).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching comments:', error);
        return of([]);
      })
    ).subscribe(comments => this._commentsBehaviorSubject.next(comments));
  }

  postComment(comment: TPostComment): Observable<TPostCommentResponse> {
    const postCommentResponse = this.http.post<TPostCommentResponse>(`${environment.nsGnServer}/comment`, comment).pipe(
      tap(() => this.getCommentsTimeline())
    );

    return postCommentResponse;
  }

  likeComment(like: TLikeComment): Observable<TPostCommentResponse> {
    const likeCommentResponse = this.http.post<TPostCommentResponse>(`${environment.nsGnServer}/comment/like`, like).pipe(
      tap(() => this.getCommentsTimeline())
    );

    return likeCommentResponse;
  }

  replyComment(response: TPostResponse): Observable<TPostCommentResponse> {
    return this.http.post<TPostCommentResponse>(`${environment.nsGnServer}/response`, response).pipe(
      tap(() => this.getCommentsTimeline())
    );
  }

  deleteComment(id: string): Observable<TPostCommentResponse> {
    return this.http.delete<TPostCommentResponse>(`${environment.nsGnServer}/comment/${id}`).pipe(
      tap(() => this.getCommentsTimeline())
    );
  }

  deleteResponse(id: string): Observable<TPostCommentResponse> {
    return this.http.delete<TPostCommentResponse>(`${environment.nsGnServer}/response/${id}`).pipe(
      tap(() => this.getCommentsTimeline())
    );
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

export type TComment = {
  id: string,
  body: string,
  likes: string[],
  createdAt: string,
  updatedAt: string,
  sender: {
    id: string,
    username: string
  }
}

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


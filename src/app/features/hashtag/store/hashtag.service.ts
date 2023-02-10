import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '@core/env.token';
import { HashtagsCollectionResponse, SingleHashtagResponse } from '../hashtag.interface';

@Injectable({ providedIn: 'root' })
export class HashtagsService {
  private http = inject(HttpClient);
  private BASE_URL = inject(API_URL);

  getAll() {
    return this.http.get<HashtagsCollectionResponse>(`${this.BASE_URL}/hashtags`);
  }

  getSingle(hashtagId: number) {
    return this.http.get<SingleHashtagResponse>(`${this.BASE_URL}/hashtags/${hashtagId}`);
  }

  add(name: string) {
    // when backend ready
    // return this.http.post(`${this.BASE_URL}/hashtags`, { name });

    // for json-server
    return this.http.post(`${this.BASE_URL}/hashtags`, { name, active: true, usage: 100 });
  }

  activate(hashtagId: number) {
    //when backend ready
    // return this.http.put(`${this.BASE_URL}/hashtags/${hashtagId}`, { active: true });

    //for json-server
    return this.http.patch(`${this.BASE_URL}/hashtags/${hashtagId}`, { active: true });
  }

  deactivate(hashtagId: number) {
    //when backend ready
    // return this.http.put(`${this.BASE_URL}/hashtags/${hashtagId}`, { active: false });

    //for json-server
    return this.http.patch(`${this.BASE_URL}/hashtags/${hashtagId}`, { active: false });
  }

  rename(hashtagId: number, name: string) {
    //when backend ready
    // return this.http.put(`${this.BASE_URL}/hashtags/${hashtagId}`, { name });

    //for json-server
    return this.http.patch(`${this.BASE_URL}/hashtags/${hashtagId}`, { name });
  }
}

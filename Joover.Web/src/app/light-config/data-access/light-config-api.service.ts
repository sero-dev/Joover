import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LightConfigApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/people';

  public getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  public getById(id: number): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  public create(id: number, name: string): Observable<Person[]> {
    const person: Person = { id, name };
    return this.http.post<Person[]>(this.baseUrl, person);
  }
}

export interface Person {
  id: number;
  name: string;
}

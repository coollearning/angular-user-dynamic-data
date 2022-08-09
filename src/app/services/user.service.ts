import { Observable } from "rxjs";
import { User } from "../model/user";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl, user);
  }

  updateUser(user: User) {
    return this.http.put<any>(`${environment.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/${id}`);
  }

}


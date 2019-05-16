import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.uri}/profiles`);
  }

  getUserById(id){
    return this.http.get(`${this.uri}/profile/${id}`);
  }

  addUser(name, email, username, password){
    const user = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/register`, user);
  }

  updateUser(id, name, email, username, password){
    const user = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    return this.http.put(`${this.uri}/profile/${id}`, user);
  }

  deleteUser(id){
    return this.http.delete(`${this.uri}/profile/${id}`);
  }
}
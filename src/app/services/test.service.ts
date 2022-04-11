import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({providedIn: 'root'})

export class TestService {
	constructor(private http: HttpClient) {

	}

	getMainPage() {
		return this.http.get<{message:String}>('http://localhost:3500');
	}
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Olympic } from "../models/Olympic";

@Injectable({
    providedIn: "root",
})
export class OlympicService {
    private olympicUrl = "./assets/mock/olympic.json";
    private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

    constructor(private http: HttpClient) {
        this.loadInitialData().subscribe(); // Ensure initial data is loaded
    }

    loadInitialData(): Observable<Olympic[]> {
        return this.http.get<Olympic[]>(this.olympicUrl).pipe(
            tap((value: Olympic[]) => this.olympics$.next(value)),
            catchError((error) => {
                console.error("Error fetching Olympic data", error);
                this.olympics$.next(null);
                return of([]); // Return an observable of an empty array instead of null
            })
        );
    }

    getOlympics(): Observable<Olympic[] | null> {
        return this.olympics$.asObservable();
    }
}

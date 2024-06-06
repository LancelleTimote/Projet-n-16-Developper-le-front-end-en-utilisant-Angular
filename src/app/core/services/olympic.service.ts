import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { catchError, takeUntil, tap } from "rxjs/operators";
import { Olympic } from "../models/Olympic";

@Injectable({
    providedIn: "root",
})
export class OlympicService implements OnDestroy {
    private olympicUrl = "./assets/mock/olympic.json";
    private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
    private unsubscribe$ = new Subject<void>();
    constructor(private http: HttpClient) {
        this.loadInitialData().subscribe();
    }

    loadInitialData(): Observable<Olympic[]> {
        return this.http.get<Olympic[]>(this.olympicUrl).pipe(
            tap((value: Olympic[]) => this.olympics$.next(value)),
            catchError((error) => {
                console.error("Error fetching Olympic data", error);
                this.olympics$.next(null);
                return of([]);
            }),
            takeUntil(this.unsubscribe$)
        );
    }

    getOlympics(): Observable<Olympic[] | null> {
        return this.olympics$.asObservable().pipe(takeUntil(this.unsubscribe$));
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

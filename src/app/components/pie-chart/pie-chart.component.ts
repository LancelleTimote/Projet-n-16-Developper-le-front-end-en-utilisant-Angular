import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { OlympicService } from "../../core/services/olympic.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Olympic } from "src/app/core/models/Olympic";
import { CommonModule } from "@angular/common";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-pie-chart",
    standalone: true,
    imports: [NgxChartsModule, CommonModule],
    templateUrl: "./pie-chart.component.html",
    styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit, OnDestroy {
    data: any[] = [];
    view: [number, number] = [700, 200];
    private unsubscribe$ = new Subject<void>();

    constructor(private olympicService: OlympicService, private router: Router) {}

    ngOnInit(): void {
        this.updateView(window.innerWidth);
        this.olympicService
            .getOlympics()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((olympics: Olympic[] | null) => {
                if (olympics) {
                    this.data = olympics.map((country) => ({
                        name: country.country,
                        value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
                    }));
                } else {
                    console.error("No data received from OlympicService");
                }
            });
    }

    onSelect(event: any): void {
        const selectedCountry = this.data.find((d) => d.name === event.name)?.name;
        if (selectedCountry) {
            this.router.navigate(["/country-detail", selectedCountry]);
        } else {
            console.error("Selected country not found in data");
        }
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.updateView(event.target.innerWidth);
    }

    private updateView(width: number) {
        if (width <= 425) {
            this.view = [700, 200];
        } else {
            this.view = [700, 400];
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

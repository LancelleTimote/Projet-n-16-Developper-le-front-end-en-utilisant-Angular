import { Component, Input, OnChanges, SimpleChanges, OnDestroy, HostListener } from "@angular/core";
import { Olympic } from "../../core/models/Olympic";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Subject } from "rxjs";

@Component({
    selector: "app-country-detail",
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: "./country-detail.component.html",
    styleUrls: ["./country-detail.component.scss"],
})
export class CountryDetailComponent implements OnChanges, OnDestroy {
    @Input() countryData: Olympic | null = null;
    medalData: any[] = [];
    view: [number, number] = [600, 300];
    private unsubscribe$ = new Subject<void>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["countryData"] && this.countryData) {
            this.medalData = [
                {
                    name: this.countryData.country,
                    series: this.countryData.participations.map((participation) => ({
                        name: participation.year.toString(),
                        value: participation.medalsCount,
                    })),
                },
            ];
        }
    }

    ngOnInit(): void {
        this.updateView(window.innerWidth);
    }

    getTotalMedals(): number {
        return this.countryData?.participations.reduce((total, p) => total + p.medalsCount, 0) || 0;
    }

    getTotalAthletes(): number {
        return this.countryData?.participations.reduce((total, p) => total + p.athleteCount, 0) || 0;
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.updateView(event.target.innerWidth);
    }

    private updateView(width: number) {
        if (width <= 425) {
            this.view = [400, 300];
        } else {
            this.view = [600, 300];
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

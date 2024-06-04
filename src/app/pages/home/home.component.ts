import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { PieChartComponent } from "src/app/components/pie-chart/pie-chart.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Olympic } from "src/app/core/models/Olympic";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    standalone: true,
    imports: [CommonModule, HeaderComponent, FooterComponent, PieChartComponent, NgxChartsModule],
})
export class HomeComponent implements OnInit {
    public olympics$: Observable<Olympic[] | null> = this.olympicService.getOlympics();
    public numberOfGames: number = 0;
    public numberOfCountries: number = 0;
    private unsubscribe$ = new Subject<void>();

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympicService
            .loadInitialData()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((olympics: Olympic[]) => {
                if (olympics) {
                    this.numberOfCountries = olympics.length;
                    this.numberOfGames = olympics
                        .flatMap((country) => country.participations)
                        .map((participation) => participation.year)
                        .filter((year, index, years) => years.indexOf(year) === index).length;
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

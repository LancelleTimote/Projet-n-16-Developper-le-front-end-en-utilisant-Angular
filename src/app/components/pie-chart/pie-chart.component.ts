import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OlympicService } from "../../core/services/olympic.service";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Olympic } from "src/app/core/models/Olympic";

@Component({
    selector: "app-pie-chart",
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: "./pie-chart.component.html",
    styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit {
    data: any[] = [];
    view: [number, number] = [700, 400];
    legendPosition: any = 'below';

    constructor(private olympicService: OlympicService, private router: Router) {}

    ngOnInit(): void {
        this.olympicService.getOlympics().subscribe((olympics: Olympic[] | null) => {
            if (olympics) {
                this.data = olympics.map(country => ({
                    name: country.country,
                    value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
                }));
            }
        });
    }

    onSelect(event: any): void {
        const selectedCountry = event.name;
        this.router.navigate(["/country-detail", selectedCountry]);
    }
}

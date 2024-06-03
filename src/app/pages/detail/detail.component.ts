import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OlympicService } from "../../core/services/olympic.service";
import { Olympic } from "../../core/models/Olympic";
import { CountryDetailComponent } from "../../components/country-detail/country-detail.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-detail",
    standalone: true,
    imports: [CommonModule, CountryDetailComponent],
    templateUrl: "./detail.component.html",
    styleUrl: "./detail.component.scss",
})
export class DetailComponent implements OnInit {
    countryName: string | null = null;
    countryData: Olympic | null = null;

    constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.countryName = this.route.snapshot.paramMap.get("countryName");
        this.olympicService.getOlympics().subscribe((olympics: Olympic[] | null) => {
            if (olympics && this.countryName) {
                this.countryData = olympics.find((country) => country.country === this.countryName) || null;
            }
        });
    }
}

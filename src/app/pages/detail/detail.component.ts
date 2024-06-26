import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { OlympicService } from "../../core/services/olympic.service";
import { Olympic } from "../../core/models/Olympic";
import { CountryDetailComponent } from "../../components/country-detail/country-detail.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "src/app/components/header/header.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-detail",
    standalone: true,
    imports: [CommonModule, CountryDetailComponent, HeaderComponent, FooterComponent, RouterModule],
    templateUrl: "./detail.component.html",
    styleUrl: "./detail.component.scss",
})
export class DetailComponent implements OnInit, OnDestroy {
    countryName: string | null = null;
    countryData: Olympic | null = null;
    private unsubscribe$ = new Subject<void>();

    constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.countryName = this.route.snapshot.paramMap.get("countryName");
        this.olympicService
            .getOlympics()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((olympics: Olympic[] | null) => {
                if (olympics && this.countryName) {
                    this.countryData = olympics.find((country) => country.country === this.countryName) || null;
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

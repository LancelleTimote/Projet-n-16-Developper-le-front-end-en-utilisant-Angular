import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    standalone: true,
    imports: [CommonModule, HeaderComponent],
})
export class HomeComponent implements OnInit {
    public olympics$: Observable<any> = of(null);

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympics$ = this.olympicService.getOlympics();
    }
}

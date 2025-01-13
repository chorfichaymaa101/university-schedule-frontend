import { Component, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
    imports: [
      MatIconModule,
    ]
})
export class HomeComponent implements AfterViewInit {
  counts = { professeurs: 69, etudiants: 1697, cadres: 28 };
  currentCounts = { professeurs: 30, etudiants: 1200, cadres: 10 };

  ngAfterViewInit() {
    this.animateCounts();
  }

  animateCounts() {
    const duration = 2000; // Durée totale de l'animation en millisecondes
    const steps = 100; // Nombre de pas dans l'animation
    const interval = duration / steps;

    const increment = {
      professeurs: this.counts.professeurs / steps,
      etudiants: this.counts.etudiants / steps,
      cadres: this.counts.cadres / steps
    };

    let step = 0;
    const timer = setInterval(() => {
      if (step < steps) {
        step++;
        this.currentCounts.professeurs = Math.round(step * increment.professeurs);
        this.currentCounts.etudiants = Math.round(step * increment.etudiants);
        this.currentCounts.cadres = Math.round(step * increment.cadres);
      } else {
        clearInterval(timer);
      }
    }, interval);
  }
}

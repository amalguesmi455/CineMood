import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  slider: Element | null = null;

  constructor() {
    this.slider = document.querySelector('.slider');
  }

  @HostListener('document:click', ['$event'])
  activate(e: Event) {
    const items = document.querySelectorAll('.item');

    if (e.target instanceof Element) {
      if (e.target.matches('.next') && this.slider) {
        this.slider.append(items[0]);
      }

      if (e.target.matches('.prev') && this.slider) {
        this.slider.prepend(items[items.length - 1]);
      }
    }
  }
}
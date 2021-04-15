import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive(
  {
    selector: '[zoom]',
  }
)

export class ZoomDirective implements OnInit {
  @Input('zoomSize') size;
  private elementDirective: ElementRef;


  @HostListener('mouseover')
  public onMouseOver() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size * 2}px`;
  }

  @HostListener('mouseout')
  public onMouseOut() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size}px`;
  }

  constructor(private element: ElementRef) {
    this.elementDirective = element;
  }

  ngOnInit() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size}px`;
  }
}

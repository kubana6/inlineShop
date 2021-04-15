import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {element} from 'protractor';

@Directive(
  {
    selector:'[content]',
  }
)

export class ContentDirective implements AfterViewInit {
  @Input() content:boolean = false ;
  private elementDirective: ElementRef;

  public isContentWasDublicated: boolean = false

  constructor(private template: TemplateRef<any>, private vc: ViewContainerRef) {
    this.vc.createEmbeddedView(template);
  }
  ngAfterViewInit() {
    if(this.content) {
      if(!this.isContentWasDublicated) {
        this.vc.insert(this.vc.createEmbeddedView(this.template))
        this.isContentWasDublicated = true
      }
    }


  }
}

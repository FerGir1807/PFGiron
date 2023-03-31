import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEstatus]'
})
export class EstatusDirective implements OnInit {
  @Input('appEstatus') estatus!: boolean

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }
  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'padding', '0px 10px 0px 10px');
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', '40px');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.estatus ? '#4caf50' : '#f44336');
  }

}

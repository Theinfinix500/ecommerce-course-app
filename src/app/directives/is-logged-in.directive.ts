import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appIsLoggedIn]',
  standalone: true,
})
export class IsLoggedInDirective implements OnInit {
  constructor(
    private auth: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.pipe(take(2)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}

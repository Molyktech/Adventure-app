import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { APPLICATION_ROUTE_PATH } from '../../constants/routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  adventurePath = APPLICATION_ROUTE_PATH.ADVENTURE;
}

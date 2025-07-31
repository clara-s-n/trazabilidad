import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true
})
export class UserProfilePage implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  user = signal<any | null>(null);
  loading = signal(false);

  async ngOnInit() {
    this.loading.set(true);
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      try {
        const userData = await this.userService.getUserById(userId);
        this.user.set(userData);
      } catch {
        this.user.set(null);
      }
    }
    this.loading.set(false);
  }
}

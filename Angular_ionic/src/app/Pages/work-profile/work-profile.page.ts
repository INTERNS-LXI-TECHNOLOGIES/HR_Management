import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-work-profile',
  templateUrl: './work-profile.page.html',
  styleUrls: ['./work-profile.page.scss'],
})
export class WorkProfilePage implements OnInit {

  status: any;
   id;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    this.userService.getStatus('http://localhost:8080/api/appraisal-controller-resource/status/' + this.id)
                                .subscribe(status => this.status = status);
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Video } from '../../models/video';

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  video: Video;
  isTablet: boolean;

  constructor(public navParams: NavParams) {
    this.video = this.navParams.get('video');
    this.isTablet = this.navParams.get('isTablet');
  }

  getHeight() {
    return this.isTablet ? '40vh' : '50%';
  }


}

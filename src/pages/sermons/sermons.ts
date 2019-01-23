import { Component, OnInit } from '@angular/core';
import { NavController, Platform, InfiniteScroll } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { VideoService } from '../../services/videos';
import { Video } from '../../models/video';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html'
})
export class SermonsPage implements OnInit {
  isBrowser = true;
  isTablet = false
  currentVideos: Video[];
  cursor: number = 0;
  increment: number;

  constructor(public navCtrl: NavController, private platform: Platform, private videoService: VideoService,
    public domSanitizer: DomSanitizer, private authService: AuthService) {
    const platforms = this.platform.platforms();

    if (platforms.indexOf('tablet') > -1) {
      // this.isBrowser = false;
      this.isTablet = true;
    }
  }

  getHeight() {
    return this.isTablet ? '40vh' : '50%';
  }

  ngOnInit() {
    this.currentVideos = this.videoService.getVideos(this.cursor);
    this.cursor = this.currentVideos.length - 1;
    this.increment = this.currentVideos.length - 1;
  }

  loadMorePosts(event: InfiniteScroll) {
    const temp = this.videoService.getVideos(this.cursor);
    for (const video of temp) {
      this.currentVideos.push(video);
    }
    this.cursor = this.currentVideos.length - 1;
    console.log(`length?`, this.cursor);
    let increase = this.cursor - this.increment;
    if (increase < 10) {
      event.enable(false);
    } else {
      event.complete();
    }
  }

}

import { Injectable } from "@angular/core";
import { data } from '../data/video-data';
import { Video } from "../models/video";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class VideoService {
  videos: Video[] = [];

  constructor(domSanitizer: DomSanitizer) {
    let name: string;
    let desc: string;
    let link: string;
    let img: string;
    for (const video of data.data) {
      name = video.name;
      desc = video.description;
      // link = video.link;  // doesn't work with vimeo, it refuses to connect
      let splitVidUrl = video.link.split('//')
      link = splitVidUrl[0] + '//player.' + splitVidUrl[1].split('/')[0] + '/video/' + splitVidUrl[1].split('/')[1] +
        '?badge=0&autopause=0&player_id=0&app_id=2221';
      img = video.pictures.sizes[video.pictures.sizes.length - 1].link;
      this.videos.push({
        name: name,
        description: desc,
        link: domSanitizer.bypassSecurityTrustResourceUrl(link),
        vidImg: img
      });
    }
  }

  getVideos(startingIndex: number) {
    let cursor = this.videos.slice(startingIndex).length - 1;
    if (cursor > 10) {
      cursor = 10;
    }
    return this.videos.slice(startingIndex, startingIndex + cursor);
  }
}

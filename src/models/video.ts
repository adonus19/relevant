import { SafeResourceUrl } from "@angular/platform-browser";

export class Video {
  constructor(public name: string, public description: string, public vidImg: string,
    public link?: SafeResourceUrl, public tempLink?: string) { }
}

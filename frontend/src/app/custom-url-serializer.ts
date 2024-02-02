import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    // Replace ';' with '?' to make it look like a query parameter
    return super.parse(url);
  }
  override serialize(tree: UrlTree): string {
    let serializedUrl = super.serialize(tree);

    // Replace ';' with '?' in the URL
    serializedUrl = serializedUrl.replace(/;/g, '?');

    return serializedUrl;
  }
}
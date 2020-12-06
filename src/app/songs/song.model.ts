import { Meta } from './meta.model';

export class Song {

  public owner: string;
  public title: string;
  public composer: string;
  public key: string;

  public data: string[][];
  public meta: Meta;

  public published: boolean;

  constructor(owner: string, title: string, composer: string, key: string, data: string[][], meta: Meta, published: boolean = true) {
    this.owner = owner;
    this.title = title;
    this.composer = composer;
    this.key = key;

    this.data = data;
    this.meta = meta;
    this.published = published;
  }

}

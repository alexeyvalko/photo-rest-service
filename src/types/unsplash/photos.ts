import { Nullable } from './helpers';
import { UserBasic } from './user';

interface StatValue {
  value: number;
  date: string;
}

interface Stat {
  total: number;
  historical: {
    change: number;
    quantity: number;
    resolution: string;
    values: StatValue[];
  };
}

export interface Stats {
  views: Stat;
  downloads: Stat;
}
export interface PhotoVeryBasic {
  id: string;
  created_at: string;
  updated_at: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    medium: string;
    small: string;
    thumb: string;
  };
}
export interface PhotoBasic extends PhotoVeryBasic {
  alt_description: Nullable<string>;
  blur_hash: Nullable<string>;
  color: Nullable<string>;
  description: Nullable<string>;
  height: number;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  sponsorship: Nullable<string>;
  promoted_at: Nullable<string>;
  width: number;
  user: UserBasic;
  tags: [];
}

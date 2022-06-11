export interface Unsplash {
  photos: {
    get: (options: any) => Promise<any>;
    getStats: (options: any) => Promise<any>;
    list: (options: any) => Promise<any>;
    getRandom: (options: any) => Promise<any>;
    trackDownload: (options: any) => Promise<any>;
  };
  users: {
    getPhotos: (options: any) => Promise<any>;
    getCollections: (options: any) => Promise<any>;
    getLikes: (options: any) => Promise<any>;
    get: (options: any) => Promise<any>;
  };
  search: {
    getCollections: (options: any) => Promise<any>;
    getPhotos: (options: any) => Promise<any>;
    getUsers: (options: any) => Promise<any>;
  };
  collections: {
    getPhotos: (options: any) => Promise<any>;
    get: (options: any) => Promise<any>;
    list: (options: any) => Promise<any>;
    getRelated: (options: any) => Promise<any>;
  };
  topics: {
    list: (options: any) => Promise<any>;
    get: (options: any) => Promise<any>;
    getPhotos: (options: any) => Promise<any>;
  };
}

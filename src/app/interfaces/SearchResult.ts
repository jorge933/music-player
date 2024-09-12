export interface SearchResult {
  items: IResultItem[];
}

export interface IResultItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    channelTitle: string;
  };
}

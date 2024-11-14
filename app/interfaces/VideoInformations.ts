export interface VideoInformations {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
  };
}

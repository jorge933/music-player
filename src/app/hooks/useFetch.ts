import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { SearchResult } from "../interfaces/SearchResult";

const api = axios.create({ timeout: 10000 });

export function useFetch<T>(options: AxiosRequestConfig): {
  data: T;
  isFetching: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  setTimeout(() => {
    setData({
      items: [
        {
          kind: "youtube#searchResult",
          etag: "ZEmMtN06gLti2_1E6Apwo4DPbps",
          id: { kind: "youtube#video", videoId: "DqQFwivXqxI" },
          snippet: {
            publishedAt: "2020-06-04T23:00:03Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Recayd Mob - Mlks de SP (feat. Derek, Dfideliz, Jé Santiago e MC Igu) (prod. Lucas Spike)",
            description:
              "Mlks de SP (Official Music Video) (feat. Derek, Dfideliz, Jé Santiago e MC Igu) (prod. Lucas Spike) Ficha técnica: Letra: Derek, ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/DqQFwivXqxI/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/DqQFwivXqxI/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/DqQFwivXqxI/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2020-06-04T23:00:03Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "GVtOafXwaUyUQK8Nf_svOG2BBxI",
          id: { kind: "youtube#video", videoId: "6uF4PeDMS64" },
          snippet: {
            publishedAt: "2017-12-19T13:00:01Z",
            channelId: "UCS7mVK5en3RJ0PTbJiKXmzQ",
            title:
              "Recayd Mob - Lifestyle Fake feat. Dfideliz | Jé Santiago | Derek [ Rap Box Ep. 139 ]",
            description:
              "Recayd Mob é um grupos mais relevantes hoje na cena trap brasileira. - Lifestyle Fake - Dfideliz, Jé Santiago, Derek RAP BOX ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/6uF4PeDMS64/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/6uF4PeDMS64/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/6uF4PeDMS64/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Rap Box",
            liveBroadcastContent: "none",
            publishTime: "2017-12-19T13:00:01Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "J_7qB9kplQcs8o3qkp4BAbGTBH0",
          id: { kind: "youtube#video", videoId: "RLTZjZOgw-4" },
          snippet: {
            publishedAt: "2021-11-19T03:03:21Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Lean na Fanta (feat. Derek, Dfideliz, MC Igu &amp; Jé Santiago) (prod. Spike) (Official Visualizer)",
            description:
              "Produção Executiva: Lucas Spike Mix/Master: Luciano Scarlercio Video: Hick Duarte Calzone Tapes Vol. 3 Recayd Mob 2021 ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/RLTZjZOgw-4/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/RLTZjZOgw-4/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/RLTZjZOgw-4/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-11-19T03:03:21Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "prOyVZjgEt9FLB5gr_sffG1KLVg",
          id: { kind: "youtube#video", videoId: "ozSWc_j07FM" },
          snippet: {
            publishedAt: "2021-07-15T23:00:14Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Recayd Mob - Eu Só Deslizo (Official Video) feat. Derek, Dfideliz, Jé Santiago, Mc Igu (prod. Spike)",
            description:
              'Vídeo Oficial da Faixa "Eu Só Deslizo" Recayd Mob Voz e letra: Derek, Dfideliz, Jé Santiago, Mc Igu Produção: Lucas Spike Mix e ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/ozSWc_j07FM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/ozSWc_j07FM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/ozSWc_j07FM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-07-15T23:00:14Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Bw4abj2wB3JDJgQRQVRi9BloDAg",
          id: { kind: "youtube#video", videoId: "suGewtIKf2g" },
          snippet: {
            publishedAt: "2021-11-19T03:02:24Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Um Minuto (feat. MC Igu, Jé Santiago, Derek &amp; Dfideliz) (Official Visualizer)",
            description:
              "Produção Executiva: Lucas Spike Mix/Master: Luciano Scarlercio Video/ Visualizer: Hick Duarte Recayd Mob 2021 Copyright.",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/suGewtIKf2g/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/suGewtIKf2g/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/suGewtIKf2g/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-11-19T03:02:24Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "Omi5GopArnCdLe8nEs6_gEAD4cA",
          id: { kind: "youtube#video", videoId: "ImpXab4WsNM" },
          snippet: {
            publishedAt: "2019-07-19T15:01:16Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Recayd Mob - NOVO DRIP (feat. Derek, Jé Santiago, Dfideliz e Mc Igu) (Official Video)",
            description:
              "Recayd Mob - NOVO DRIP (feat. Derek, Jé Santiago, Dfideliz e Mc Igu) (Official Video)(prod. Lucas Spike) Video Director: ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/ImpXab4WsNM/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/ImpXab4WsNM/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/ImpXab4WsNM/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2019-07-19T15:01:16Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "HEtD_l5zJK_ZzlLZroWbFyAXNi4",
          id: { kind: "youtube#video", videoId: "n7QI7YJpd_I" },
          snippet: {
            publishedAt: "2021-11-19T03:03:04Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Rich N*gga Sh*t (feat. Mc Igu, Sidoka, Derek &amp; Jé Santiago) (Official Visualizer)",
            description:
              "Produção Executiva: Lucas Spike Mix/Master: Luciano Scarlercio Video: Hick Duarte Calzone Tapes Vol. 3 Recayd Mob 2021 ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/n7QI7YJpd_I/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/n7QI7YJpd_I/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/n7QI7YJpd_I/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-11-19T03:03:04Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "jtqKzseRhL2im4FTu2rfFHMli6I",
          id: { kind: "youtube#video", videoId: "DTlC6woU_zs" },
          snippet: {
            publishedAt: "2021-08-13T15:00:08Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Recayd Mob - Bonde da Fumaça (prod. Murda Beatz) (Official Music Video)",
            description:
              'Vídeo Oficial da Faixa "Bonde da Fumaça" ft. Murda Beatz Recayd Mob, segundo single do álbum Calzone Tapes, Vol. 3 Ouça ...',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/DTlC6woU_zs/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/DTlC6woU_zs/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/DTlC6woU_zs/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-08-13T15:00:08Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "-egdWqx7Z6VSsqyGHjB2mf5YmVg",
          id: { kind: "youtube#video", videoId: "Na59Tx9lEzs" },
          snippet: {
            publishedAt: "2024-09-10T12:31:37Z",
            channelId: "UCkdx-kNwqJUy5eglfpGhfEg",
            title:
              "(FREE) Duzz x Matuê x Drake Type Beat - &quot;Espelho&quot; | Trap Beat 2024 (prod. Artuh)",
            description:
              "Buy 1 get 2 free: https://bsta.rs/SqGR5 Bpm: 125 Key: Fm - O uso FREE deste beat é permitido somente no Youtube e ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Na59Tx9lEzs/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Na59Tx9lEzs/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Na59Tx9lEzs/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "prod. Artuh",
            liveBroadcastContent: "none",
            publishTime: "2024-09-10T12:31:37Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "FatPY7C4ObfqAp11KhDALJt2HoI",
          id: { kind: "youtube#video", videoId: "MrKi9Vc3cSo" },
          snippet: {
            publishedAt: "2021-11-19T03:04:15Z",
            channelId: "UCsRhzchPWM8w6fFTrp1Dv3A",
            title:
              "Vícios (feat. The Boy, Jé Santiago, MC Igu, N.A.N.A. &amp; Dfideliz) (Official Visualizer)",
            description:
              "Produção Executiva: Lucas Spike Mix/Master: Luciano Scarlercio Video: Hick Duarte Calzone Tapes Vol. 3 Recayd Mob 2021 ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/MrKi9Vc3cSo/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/MrKi9Vc3cSo/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/MrKi9Vc3cSo/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Recayd Mob Official",
            liveBroadcastContent: "none",
            publishTime: "2021-11-19T03:04:15Z",
          },
        },
      ],
    } as T);
    setIsFetching(false);
  }, 500);
  // useEffect(() => {
  //   api
  //     .request<T>(options)
  //     .then(({ data }) => {
  //       setData(data);
  //       console.log(JSON.stringify(data));
  //     })
  //     .finally(() => setIsFetching(false));
  // }, []);

  return { data: data as T, isFetching };
}

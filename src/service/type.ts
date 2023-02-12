export type articlesResult = {
  code: number;
  message:
    | {
        count: number;
        aticles?: {
          uuid: string;
          title: string;
          description: string;
          cover: string;
          content: string;
          createdAt: string;
        }[];
      }
    | string;
};

export type articleResult = {
  code: number;
  message:
    | {
        aticle?: {
          uuid: string;
          title: string;
          description: string;
          cover: string;
          content: string;
          createdAt: string;
        } | null;
      }
    | string;
};

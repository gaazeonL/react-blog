import { articlesResult, articleResult } from "@service/type";
export const nullArticlesResult: articlesResult = {
  code: -1,
  message: {
    count: 0,
    aticles: [],
  },
};
export const nullArticleResult: articleResult = {
  code: -1,
  message: {
    aticle: null,
  },
};

import fetchService from "@utils/fetchService";
import { nullArticlesResult, nullArticleResult } from "@service/errorResult";

/**根据传入参数来创建文章
 *
 * @param options 配置信息
 */
export const createArticleService = async (options: {
  uuid: string;
  title: string;
  text: string;
  content: string;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/article/create/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      uuid: options.uuid,
      title: options.title,
      description: options.text.substring(0, 100) + "...",
      content: options.content,
    }),
    setLoading: options.setLoading,
    successMessage: "文章创建成功",
    errorResult: nullArticleResult,
  });
};

/**根据UUID删除文章
 *
 * @param options 配置信息
 */
export const deleteArticleService = async (options: {
  uuid: string;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/article/delete/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      uuid: options.uuid,
    }),
    setLoading: options.setLoading,
    successMessage: "文章删除成功",
    errorResult: nullArticleResult,
  });
};

/**根据传入参数来编辑文章
 *
 * @param options 配置信息
 */
export const editArticleService = async (options: {
  uuid: string;
  title: string;
  text: string;
  content: string;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/article/edit/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      uuid: options.uuid,
      title: options.title,
      description: options.text.substring(0, 100) + "...",
      content: options.content,
    }),
    setLoading: options.setLoading,
    successMessage: "文章修改成功",
    errorResult: nullArticleResult,
  });
};

/**根据页目查找10篇文章，如果有输入标题就按照标题来找
 *
 * @param pageNumber 页目
 * @param title 文章标题
 */
export const getArticlesService = async (
  pageNumber: number,
  title?: string
) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/article/get/",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageNumber,
      title: title ? title : "",
    }),
    method: "POST",
    errorResult: nullArticlesResult,
  });
};

/**根据UUID查找文章
 *
 * @param uuid 文章的UUID
 * @returns
 */
export const getArticleService = async (uuid: string) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/article/get/" + uuid,
    method: "POST",
    errorResult: nullArticleResult,
  });
};

export const articleResultIsSuccess = function (result: any) {
  if (typeof result.message !== "string" && result.message.aticles) {
    return true;
  } else {
    return false;
  }
};

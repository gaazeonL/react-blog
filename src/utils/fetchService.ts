import notification from "antd/lib/notification";
/**fetch的封装
 *
 * @param options 配置选项
 */
export default async function fetchService<
  T extends {
    code: number;
    message: any;
  }
>(options: {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage?: string;
  errorResult: T;
}) {
  options.setLoading && options.setLoading(true);
  try {
    const result: T = await (
      await fetch(options.url, {
        method: options.method ? options.method : "GET",
        headers: options.headers,
        body: options.body,
      })
    ).json();
    if (typeof result.message === "string") {
      notification.error({
        message: "错误代码：" + result.code,
        description: result.message,
      });
    } else if (result.message && typeof result.message !== "string") {
      options.successMessage &&
        notification.success({
          message: options.successMessage,
        });
    }
    options.setLoading && options.setLoading(false);
    return result;
  } catch {
    notification.error({
      message: "网络连接错误或服务器错误",
    });
    options.setLoading && options.setLoading(false);
    return options.errorResult;
  }
}

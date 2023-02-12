export const getAboutMeService = async () => {
  type treeNode = {
    name: string;
    value?: any;
    children?: treeNode[];
  };
  const result: {
    code: number;
    message: treeNode;
  } = await (
    await fetch(import.meta.env.VITE_SERVER + "/getaboutme", {
      method: "GET",
    })
  ).json();
  return result;
};

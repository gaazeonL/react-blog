export type treeNode = {
  name: string;
  value?: any;
  children?: treeNode[];
};
export type aboutMeState = {
  data: {
    technologyStack: treeNode;
  };
};

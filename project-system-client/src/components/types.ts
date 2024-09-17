export type IProjectPage = {
  label: string;
  path: string;
  icon: JSX.Element;
  subs?: IProjectPage[];
};

import axiosBuilder from "./axiosBuilder";

const baseUrl = `http://localhost:4000/`;

export type VersionModel = {
  projectCode: string;
  versionCode: number;
  createdTime: Date;
  title: string;
  content: string;
};

//Get
async function getAll(projectCode: string): Promise<VersionModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/versions`);
  return res.data;
}

//Create
async function create(model: VersionModel): Promise<unknown> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .post(`api/v1/ps/projects/${model.projectCode}/versions`, model);
  return res.data;
}

const service = {
  getAll,
  create,
};

export default service;

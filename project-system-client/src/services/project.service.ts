import axiosBuilder from "./axiosBuilder";

export type ProjectModel = {
  code: string;
  name: string;
  description: string;
};

const baseUrl = `http://localhost:4000/`;

async function getAll(): Promise<ProjectModel[]> {
  const res = await axiosBuilder.getInstance(baseUrl).get("api/v1/ps/projects");
  return res.data;
}

async function get(projectCode: string): Promise<ProjectModel> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}`);

  return res.data;
}

async function getMyProjects(): Promise<ProjectModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/me`);

  return res.data;
}

const projectService = {
  getAll,
  get,
  getMyProjects,
};

export default projectService;

import axiosBuilder from "./axiosBuilder";

const baseUrl = `http://localhost:4000/`;

export const MAX_LEVEL = 7;

export type ElementApiModel = {
  elementCode: string;
  elementName: string;
  level: number;
  parentCode: string;
};

//Get Items Async
async function getItemsAsync(
  projectCode: string,
  versionCode?: string,
  codes?: string
): Promise<ElementApiModel[]> {
  let apiUri = `api/v1/ps/projects/${projectCode}/elements/items`;

  const queries: string[] = [];

  if (versionCode !== undefined) queries.push(`versionCode=${versionCode}`);
  if (codes !== undefined) queries.push(`codes=${codes}`);

  if (queries.length > 0) {
    const queriesStr = queries.join("&");
    apiUri = `${apiUri}?${queriesStr}`;
  }

  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);

  return res.data;
}

//Get Item By Code
async function getItemByCodeAsync(
  projectCode: string,
  elementCode: string,
  versionCode?: string
): Promise<ElementApiModel> {
  let apiUri = `api/v1/ps/projects/${projectCode}/elements/${elementCode}`;

  const queries: string[] = [];

  if (versionCode !== undefined) queries.push(`versionCode=${versionCode}`);

  if (queries.length > 0) {
    const queriesStr = queries.join("&");
    apiUri = `${apiUri}?${queriesStr}`;
  }

  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);

  return res.data;
}

// Upload element
async function upload(projectCode: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("projectCode", projectCode);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .post(
      `api/v1/ps/projects/${projectCode}/elements/upload`,
      formData,
      config
    );
  return res.data;
}

const elementService = {
  getItemsAsync,
  getItemByCodeAsync,
  upload,
};

export default elementService;

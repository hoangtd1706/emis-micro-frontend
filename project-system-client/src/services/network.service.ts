import axiosBuilder from "./axiosBuilder";

const baseUrl = `http://localhost:4000/`;

export type NetworkApiModel = {
  networkCode: string;
  networkName: string;
  elements: NetworkElementApiModel[];
  shortcuts: NetworkShortcutApiModel[];
  parts: NetworkPartApiModel[];
  steps: NetworkStepApiModel[];
};

export type NetworkElementApiModel = {
  networkCode: string;
  elementCode: string;
  startDate: Date;
  finishDate: Date;
};

export type NetworkShortcutApiModel = {
  networkCode: string;
  idCode: string;
};

export type NetworkPartApiModel = {
  networkCode: string;
  partCode: string;
  description: string;
  order: number;
};

export type NetworkStepApiModel = {
  networkCode: string;
  stepCode: string;
  description: string;
  order: number;
};

//Get Items Async
async function getItemsAsync(
  projectCode: string,
  versionCode?: string,
  codes?: string
): Promise<NetworkApiModel[]> {
  let apiUri = `api/v1/ps/projects/${projectCode}/networks/items`;

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
  networkCode: string,
  versionCode?: string
): Promise<NetworkApiModel> {
  let apiUri = `api/v1/ps/projects/${projectCode}/networks/${networkCode}`;

  const queries: string[] = [];

  if (versionCode !== undefined) queries.push(`versionCode=${versionCode}`);

  if (queries.length > 0) {
    const queriesStr = queries.join("&");
    apiUri = `${apiUri}?${queriesStr}`;
  }

  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);

  return res.data;
}

// Upload networks
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
      `api/v1/ps/projects/${projectCode}/networks/upload`,
      formData,
      config
    );
  return res.data;
}

// Upload Elements
async function uploadElement(projectCode: string, files: File[]) {
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
      `api/v1/ps/projects/${projectCode}/networks/upload-elements`,
      formData,
      config
    );
  return res.data;
}

// Upload Shortcuts
async function uploadShortcut(projectCode: string, files: File[]) {
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
      `api/v1/ps/projects/${projectCode}/networks/upload-shortcuts`,
      formData,
      config
    );
  return res.data;
}

const networkService = {
  getItemsAsync,
  getItemByCodeAsync,

  upload,
  uploadElement,
  uploadShortcut,
};

export default networkService;

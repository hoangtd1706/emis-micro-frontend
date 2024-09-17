import axiosBuilder from "./axiosBuilder";

const baseUrl = `http://localhost:4000/`;

export type ShortcutApiModel = {
  idCode: string;
  description: string;
  unit: string;
  serviceCode: string;
  billCode: string;
};

export type ShortcutReportApiModel = {
  idCode: string;
  description: string;
  unit: string;
  networkCode: string;
  networkName: string;
  serviceCode: string;
  orderItemCode: string;
  orderItemDescription: string;
  orderItemUnit: string;
  orderItemQuantity: number;
  baselineQuantity: number;
  preQuantity: number;
  currentQuantity: number;
};

//Get Items Async
async function getItemsAsync(
  projectCode: string,
  versionCode?: string,
  codes?: string
): Promise<ShortcutApiModel[]> {
  let apiUri = `api/v1/ps/projects/${projectCode}/shortcuts/items`;

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
  idCode: string,
  versionCode?: string
): Promise<ShortcutApiModel> {
  let apiUri = `api/v1/ps/projects/${projectCode}/shortcuts/${idCode}`;

  const queries: string[] = [];

  if (versionCode !== undefined) queries.push(`versionCode=${versionCode}`);

  if (queries.length > 0) {
    const queriesStr = queries.join("&");
    apiUri = `${apiUri}?${queriesStr}`;
  }

  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);

  return res.data;
}

// Upload shortcuts
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
      `api/v1/ps/projects/${projectCode}/shortcuts/upload`,
      formData,
      config
    );
  return res.data;
}

// Report shortcut
async function getReport(
  projectCode: string
): Promise<ShortcutReportApiModel[]> {
  const apiUri = `api/v1/ps/projects/${projectCode}/shortcuts/report`;
  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);
  return res.data;
}

function download(projectCode: string, fileName: string): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/shortcuts/download`, {
      responseType: "blob",
    })
    .then((res) => {
      DownloadFile(res.data, fileName);
      return true;
    });
}

function downloadReport(
  projectCode: string,
  fileName: string
): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/shortcuts/download-report`, {
      responseType: "blob",
    })
    .then((res) => {
      DownloadFile(res.data, fileName);
      return true;
    });
}

function DownloadFile(data: any, fileName: string) {
  const href = URL.createObjectURL(data);

  // create "a" HTML element with href to file & click
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", fileName); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
  return true;
}

const service = {
  getItemsAsync,
  getItemByCodeAsync,
  getReport,

  upload,

  download,
  downloadReport,
};

export default service;

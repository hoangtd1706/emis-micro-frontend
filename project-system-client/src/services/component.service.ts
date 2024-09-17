import axiosBuilder from "./axiosBuilder";
import { ElementApiModel } from "./element.service";

const baseUrl = `http://localhost:4000/`;

export type ComponentApiModel = {
  componentCode: string;
  componentName: string;
  totalQuantity: number;
  activities: ActivityApiModel[];
  mappings: MappingApiModel[];
};

export type ActivityApiModel = {
  idCode: string;
  quantity: number;
};

export type MappingApiModel = {
  elementCode: string;
  componentCode: string;
  quantity: number;
};

export type TotalQuantityReportApiModel = {
  componentCode: string;
  componentName: string;
  idCode: string;
  description: string;
  serviceCode: string;
  billCode: string;
  networkCode: string;
  networkName: string;
  amount: number;
  unit: string;
  quantity: number;
  totalQuantity: number;
};

export type SumQuantityByElementApiModel = {
  elements: ElementApiModel[];
  totalQuantity: TotalQuantityByElementApiModel[];
  shortcuts: ShortcutQuantityApiModel[];
};

export type TotalQuantityByElementApiModel = {
  elementCode: string;
  elementName: string;
  parentCode: string;
  componentCode: string;
  idCode: string;
  quantity?: number;
};

export type ShortcutQuantityApiModel = {
  idCode: string;
  description: string;
  unit: string;
  serviceCode: string;
  billCode: string;
  networkCode: string;
  networkName: string;
  totalQuantity: number;
};

//Get Items Async
async function getItemsAsync(
  projectCode: string,
  versionCode?: string,
  codes?: string
): Promise<ComponentApiModel[]> {
  let apiUri = `api/v1/ps/projects/${projectCode}/components/items`;

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
  componentCode: string,
  versionCode?: string
): Promise<ComponentApiModel> {
  let apiUri = `api/v1/ps/projects/${projectCode}/components/${componentCode}`;

  const queries: string[] = [];

  if (versionCode !== undefined) queries.push(`versionCode=${versionCode}`);

  if (queries.length > 0) {
    const queriesStr = queries.join("&");
    apiUri = `${apiUri}?${queriesStr}`;
  }

  const res = await axiosBuilder.getInstance(baseUrl).get(apiUri);

  return res.data;
}

// Upload components
async function uploadComponent(projectCode: string, files: File[]) {
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
      `api/v1/ps/projects/${projectCode}/components/upload`,
      formData,
      config
    );
  return res.data;
}

// Upload activities
async function uploadActivity(projectCode: string, files: File[]) {
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
      `api/v1/ps/projects/${projectCode}/components/upload-activities`,
      formData,
      config
    );
  return res.data;
}

// Upload mappings
async function uploadMapping(projectCode: string, files: File[]) {
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
      `api/v1/ps/projects/${projectCode}/components/upload-mappings`,
      formData,
      config
    );
  return res.data;
}

// Total quantity report
async function getTotalQuantityReport(
  projectCode: string
): Promise<TotalQuantityReportApiModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/components/total-quantity-report`);
  return res.data;
}

// Sum quantity by wbs report
async function getSumQuantityByElementReport(
  projectCode: string
): Promise<SumQuantityByElementApiModel> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/components/sum-quantity-by-element`
    );
  return res.data;
}

function downloadComponent(
  projectCode: string,
  fileName: string
): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/components/download`, {
      responseType: "blob",
    })
    .then((res) => {
      DownloadFile(res.data, fileName);
      return true;
    });
}

function downloadMapping(
  projectCode: string,
  fileName: string
): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/components/download-mapping`, {
      responseType: "blob",
    })
    .then((res) => {
      DownloadFile(res.data, fileName);
      return true;
    });
}

function downloadTotalQuantityReport(
  projectCode: string,
  fileName: string
): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/components/download-total-quantity-report`,
      {
        responseType: "blob",
      }
    )
    .then((res) => {
      DownloadFile(res.data, fileName);
      return true;
    });
}

function downloadSumQuantityByWbsReport(
  projectCode: string,
  fileName: string
): Promise<boolean> {
  return axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/components/download-sum-quantity-by-wbs-report`,
      {
        responseType: "blob",
      }
    )
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

  uploadComponent,
  uploadActivity,
  uploadMapping,

  getTotalQuantityReport,
  getSumQuantityByElementReport,

  downloadComponent,
  downloadMapping,
  downloadTotalQuantityReport,
  downloadSumQuantityByWbsReport,
};

export default service;

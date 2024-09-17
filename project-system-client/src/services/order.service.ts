import { sortFunction } from "../utils";
import axiosBuilder from "./axiosBuilder";

const baseUrl = `http://localhost:4000/`;

export type Order = {
  orderNumber: string;
  contractCode: string;
  contractSigningDate: Date;
  projectCode: string;
  items: OrderItem[];
};

export type OrderItem = {
  code: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  workPackage: string;
};

async function getByProject(projectCode: string): Promise<Order[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/orders/items`);
  return res.data;
}

async function getIpcByProject(projectCode: string): Promise<Order[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(`api/v1/ps/projects/${projectCode}/orders/ipc`);
  return res.data;
}

export type Bill = {
  billCode: string;
  description: string;
  unit: string;
  price: number;
  baselineQuantity: number;
  totalQuantity: number;
  workPackage: string;
};

const getBillsFromOrders = (orders: Order[]): Bill[] => {
  const result: Bill[] = [];

  if (orders.length <= 0) return [];

  const firstOrder = orders.sort(
    (a, b) =>
      new Date(a.contractSigningDate).getTime() -
      new Date(b.contractSigningDate).getTime()
  )[0];

  const items = orders.map((x) => x.items).flat();

  orders
    .sort(
      (a, b) =>
        new Date(a.contractSigningDate).getTime() -
        new Date(b.contractSigningDate).getTime()
    )
    .forEach((order) => {
      order.items
        .sort((x, y) => sortFunction("asc")(x.code, y.code))
        .forEach((item) => {
          const exist = result.find((x) => x.billCode === item.code);
          if (exist === undefined) {
            const bill: Bill = {
              billCode: item.code,
              description: item.description,
              price: item.price,
              unit: item.unit,
              baselineQuantity: 0,
              totalQuantity: 0,
              workPackage: item.workPackage,
            };

            const first = firstOrder.items.find((x) => x.code === item.code);
            if (first !== undefined) bill.baselineQuantity = first.quantity;

            bill.totalQuantity = items
              .filter((x) => x.code === item.code)
              .map((x) => x.quantity)
              .reduce((a, v) => a + v, 0);

            result.push(bill);
          }
        });
    });

  return result;
};

const getFirstOrder = (orders: Order[]): Order | null => {
  if (orders.length <= 0) return null;

  return orders.sort(
    (a, b) =>
      new Date(a.contractSigningDate).getTime() -
      new Date(b.contractSigningDate).getTime()
  )[0];
};

// Get View report

export type OrderDetailModel = {
  billCode: string;
  idCode: string;
  idDescription: string;
  componentCode: string;
  componentDescription: string;
  elementCode: string;
  elementDescription: string;
  quantity: number;
};

async function getDetail(
  projectCode: string,
  version = "working"
): Promise<OrderDetailModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/orders/detail?versionCode=${version}`
    );
  return res.data;
}

// Get Compare report
export type OrderCompareModel = {
  billCode: string;
  totalQuantity: number;
  mappedQuantity: number;
};

async function getCompare(
  projectCode: string,
  version = "working"
): Promise<OrderCompareModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/orders/compare?versionCode=${version}`
    );
  return res.data;
}

// Get Schedule report
export type OrderScheduleModel = {
  billCode: string;
  month: number;
  year: number;
  period: number;
  quantity: number;
};

async function getSchedule(
  projectCode: string,
  version = "working"
): Promise<OrderScheduleModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/orders/schedule?versionCode=${version}`
    );
  return res.data;
}

async function getConfirmation(
  projectCode: string,
  version = "working"
): Promise<OrderScheduleModel[]> {
  const res = await axiosBuilder
    .getInstance(baseUrl)
    .get(
      `api/v1/ps/projects/${projectCode}/orders/confirmation?versionCode=${version}`
    );
  return res.data;
}

const orderService = {
  getByProject,
  getIpcByProject,
  getBillsFromOrders,
  getFirstOrder,
  getDetail,
  getCompare,
  getSchedule,
  getConfirmation,
};

export default orderService;

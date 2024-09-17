import { formatDate } from "../../../../../../Ecoba/project-system/project-system-feature/src/utils";
import { ColumnSettings } from "handsontable/settings";
import { Order } from "../../../../../../Ecoba/project-system/project-system-feature/src/ProjectSystemFeature/services/order.service";
import {
  baseQtyRender,
  baseValueRender,
  createRenderer,
  priceRender,
  totalQtyRender,
  totalValueRender,
  unitRender,
} from "./_renderers";
import { BaseRenderer } from "handsontable/renderers";

export type Row = {
  // __children?: Row[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type WorkPackage = {
  code: string;
  description: string;
  baselineValue: number;
  totalValue: number;
  items: Item[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  open: boolean;
};

export type Item = {
  code: string;
  description: string;
  price: number;
  unit: string;
  baselineQuantity: number | null;
  baselineValue: number | null;
  totalQuantity: number;
  totalValue: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const baseColumns: ColumnSettings[] = [
  {
    data: "description",
    width: 250,
    renderer: createRenderer(),
  },
  {
    data: "price",
    width: 100,
    renderer: createRenderer(priceRender),
  },

  {
    data: "unit",
    width: 60,
    renderer: createRenderer(unitRender),
  },
  {
    data: "baselineQuantity",
    width: 100,
    renderer: createRenderer(baseQtyRender),
  },
  {
    data: "baselineValue",
    width: 130,
    renderer: createRenderer(baseValueRender),
  },
  {
    data: "totalQuantity",
    width: 100,
    renderer: createRenderer(totalQtyRender),
  },
  {
    data: "totalValue",
    width: 130,
    renderer: createRenderer(totalValueRender),
  },
];

export const getUnit = (ratio: number): string => {
  if (ratio === 1000) return "ngVND";
  if (ratio === 1000000) return "trVND";
  if (ratio === 1000000000) return "tỷVND";

  return "VND";
};

export const renderData = (
  workPackages: WorkPackage[] | null,
  ratio: number
): Row[] | null => {
  if (workPackages === null) {
    return null;
  } else {
    const data: Row[] = [];
    workPackages.forEach((workPackage) => {
      const workPackageRow = { ...workPackage };
      Object.keys(workPackage).forEach((k) => {
        if (k.includes("Value") || k.includes("_value")) {
          workPackageRow[k] = workPackage[k] / ratio;
        }
      });

      data.push(workPackageRow);
      if (workPackage.open) {
        workPackage.items.forEach((item) => {
          const itemRow = { ...item };
          Object.keys(item).forEach((k) => {
            if (k.includes("Value") || k.includes("_value")) {
              if (typeof item[k] === "number") {
                itemRow[k] = item[k] / ratio;
              } else {
                itemRow[k] = item[k];
              }
            }
          });

          data.push(itemRow);
        });
      }
    });

    return data;
  }
};

export const getBaseHeaders = (
  firstContract: Order,
  ratio: number,
  row = 4
) => {
  switch (row) {
    case 0:
      return [
        "",
        "",
        { label: "Số hợp đồng", colspan: 2 },
        { label: firstContract.contractCode, colspan: 2 },
        { label: "", colspan: 2 },
      ];
    case 1:
      return [
        "",
        "",
        { label: "Mã hợp đồng", colspan: 2 },
        { label: firstContract.orderNumber, colspan: 2 },
        { label: "", colspan: 2 },
      ];
    case 2:
      return [
        "",
        "",
        { label: "Ngày ký", colspan: 2 },
        {
          label: formatDate(new Date(firstContract.contractSigningDate)),
          colspan: 2,
        },
        { label: "", colspan: 2 },
      ];
    case 3:
      return [
        "",
        "",
        "",
        "",
        { label: "Hợp đồng gốc", colspan: 2 },
        { label: "HĐ+PLHĐ", colspan: 2 },
      ];
    default:
      return [
        "Mã BOQ",
        "Diễn giải",
        "Đơn giá (VND)",
        "Đơn vị",
        "Khối lượng",
        `Thành tiền (${getUnit(ratio)})`,
        "Khối lượng",
        `Thành tiền (${getUnit(ratio)})`,
      ];
  }
};

export function createColumn(
  data: string,
  width: number,
  customRenderer?: BaseRenderer
) {
  return {
    data,
    width,
    renderer: createRenderer(customRenderer),
  };
}

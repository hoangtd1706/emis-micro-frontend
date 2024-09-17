import { RawData } from "../../helpers";
import { ComponentApiModel } from "../../services/component.service";
import { ElementApiModel } from "../../services/element.service";
import { Bill, Order } from "../../services/order.service";
import { ShortcutApiModel } from "../../services/shortcut.service";
import { getDiffDays, isEmptyOrSpaces } from "../../utils";
import { Item, WorkPackage } from "./_utils";

export function buildOrdersData(
  elements: ElementApiModel[],
  subContracts: Order[],
  bills: Bill[]
): WorkPackage[] {
  const workPackages = [
    ...new Set(
      bills
        .map((x) => x.workPackage)
        .filter((x) => !isEmptyOrSpaces(x))
        .sort((a, b) => (a >= b ? 1 : -1))
    ),
  ];

  const result: WorkPackage[] = [];

  const totalRow: WorkPackage = {
    code: "TỔNG CỘNG",
    description: "",
    baselineValue: 0,
    totalValue: 0,
    items: [],
    open: true,
  };

  workPackages.forEach((w) => {
    const row: WorkPackage = {
      code: w,
      description: elements.find((e) => e.elementCode === w)?.elementName ?? "",
      baselineValue: 0,
      totalValue: 0,
      items: [],
      open: false,
    };

    row.items = bills
      .filter((bill) => bill.workPackage === w)
      .map((bill) => {
        const billRow: Item = {
          code: bill.billCode,
          description: bill.description,
          price: bill.price,
          unit: bill.unit,
          baselineQuantity:
            bill.baselineQuantity === 0 ? null : bill.baselineQuantity,
          baselineValue:
            bill.baselineQuantity === 0
              ? null
              : bill.baselineQuantity * bill.price,
          totalQuantity: bill.totalQuantity,
          totalValue: bill.totalQuantity * bill.price,
        };

        if (billRow.baselineValue !== null) {
          totalRow.baselineValue += billRow.baselineValue;
          row.baselineValue += billRow.baselineValue;
        }

        totalRow.totalValue += billRow.totalValue;
        row.totalValue += billRow.totalValue;

        subContracts.forEach((sub) => {
          const subItem = sub.items.find((x) => x.code === bill.billCode);
          if (subItem === undefined) {
            billRow[`${sub.orderNumber}_qty`] = null;
            billRow[`${sub.orderNumber}_value`] = null;
          } else {
            billRow[`${sub.orderNumber}_qty`] = subItem.quantity;
            billRow[`${sub.orderNumber}_value`] =
              billRow.price * subItem.quantity;

            if (billRow[`${sub.orderNumber}_value`] !== null) {
              totalRow[`${sub.orderNumber}_value`] = totalRow[
                `${sub.orderNumber}_value`
              ]
                ? totalRow[`${sub.orderNumber}_value`] +
                  billRow[`${sub.orderNumber}_value`]
                : billRow[`${sub.orderNumber}_value`];
              row[`${sub.orderNumber}_value`] = row[`${sub.orderNumber}_value`]
                ? row[`${sub.orderNumber}_value`] +
                  billRow[`${sub.orderNumber}_value`]
                : billRow[`${sub.orderNumber}_value`];
            }
          }
        });

        return billRow;
      });

    result.push(row);
  });

  return [totalRow, ...result];
}

export function buildPaymentsData(
  elements: ElementApiModel[],
  payments: Order[],
  bills: Bill[]
): WorkPackage[] {
  const workPackages = [
    ...new Set(
      bills
        .map((x) => x.workPackage)
        .filter((x) => !isEmptyOrSpaces(x))
        .sort((a, b) => (a >= b ? 1 : -1))
    ),
  ];

  const result: WorkPackage[] = [];

  const totalRow: WorkPackage = {
    code: "TỔNG CỘNG",
    description: "",
    baselineValue: 0,
    totalValue: 0,
    paymentValue: 0,
    items: [],
    open: true,
  };

  workPackages.forEach((w) => {
    const row: WorkPackage = {
      code: w,
      description: elements.find((e) => e.elementCode === w)?.elementName ?? "",
      baselineValue: 0,
      totalValue: 0,
      paymentValue: 0,
      items: [],
      open: false,
    };

    row.items = bills
      .filter((bill) => bill.workPackage === w)
      .map((bill) => {
        const billRow: Item = {
          code: bill.billCode,
          description: bill.description,
          price: bill.price,
          unit: bill.unit,
          baselineQuantity:
            bill.baselineQuantity === 0 ? null : bill.baselineQuantity,
          baselineValue:
            bill.baselineQuantity === 0
              ? null
              : bill.baselineQuantity * bill.price,
          totalQuantity: bill.totalQuantity,
          totalValue: bill.totalQuantity * bill.price,
          paymentQuantity: 0,
          paymentValue: 0,
        };

        if (billRow.baselineValue !== null) {
          totalRow.baselineValue += billRow.baselineValue;
          row.baselineValue += billRow.baselineValue;
        }

        totalRow.totalValue += billRow.totalValue;
        row.totalValue += billRow.totalValue;

        payments.forEach((payment) => {
          const subItem = payment.items.find((x) => x.code === bill.billCode);
          if (subItem === undefined) {
            billRow[`${payment.orderNumber}_qty`] = null;
            billRow[`${payment.orderNumber}_value`] = null;
          } else {
            billRow[`${payment.orderNumber}_qty`] = subItem.quantity;
            billRow[`${payment.orderNumber}_value`] =
              billRow.price * subItem.quantity;

            if (billRow[`${payment.orderNumber}_value`] !== null) {
              totalRow[`${payment.orderNumber}_value`] = totalRow[
                `${payment.orderNumber}_value`
              ]
                ? totalRow[`${payment.orderNumber}_value`] +
                  billRow[`${payment.orderNumber}_value`]
                : billRow[`${payment.orderNumber}_value`];

              row[`${payment.orderNumber}_value`] = row[
                `${payment.orderNumber}_value`
              ]
                ? row[`${payment.orderNumber}_value`] +
                  billRow[`${payment.orderNumber}_value`]
                : billRow[`${payment.orderNumber}_value`];

              billRow.paymentValue += billRow[`${payment.orderNumber}_value`];
            }
          }
        });

        totalRow.paymentValue += billRow.paymentValue;
        row.paymentValue += billRow.paymentValue;

        return billRow;
      });

    result.push(row);
  });

  return [totalRow, ...result];
}

export function buildStatusData(
  bills: Bill[],
  rawData: RawData[],
  elements: ElementApiModel[]
): WorkPackage[] {
  const workPackages = [
    ...new Set(
      bills
        .map((x) => x.workPackage)
        .filter((x) => !isEmptyOrSpaces(x))
        .sort((a, b) => (a >= b ? 1 : -1))
    ),
  ];

  const result: WorkPackage[] = [];

  const totalRow: WorkPackage = {
    code: "TỔNG CỘNG",
    description: "",
    baselineValue: 0,
    totalValue: 0,
    items: [],
    open: true,

    planValue: 0,
    actualValue: 0,
    revenueValue: 0,
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  workPackages.forEach((w) => {
    const row: WorkPackage = {
      code: w,
      description: elements.find((e) => e.elementCode === w)?.elementName ?? "",
      baselineValue: 0,
      totalValue: 0,
      items: [],
      open: false,

      planValue: 0,
      actualValue: 0,
      revenueValue: 0,
    };

    row.items = bills
      .filter((bill) => bill.workPackage === w)
      .map((bill) => {
        const billRow: Item = {
          code: bill.billCode,
          description: bill.description,
          price: bill.price,
          unit: bill.unit,
          baselineQuantity:
            bill.baselineQuantity === 0 ? null : bill.baselineQuantity,
          baselineValue:
            bill.baselineQuantity === 0
              ? null
              : bill.baselineQuantity * bill.price,
          totalQuantity: bill.totalQuantity,
          totalValue: bill.totalQuantity * bill.price,

          planQuantity: 0,
          planValue: 0,
          actualQuantity: 0,
          actualValue: 0,
          revenueQuantity: 0,
          revenueValue: 0,
        };

        if (billRow.baselineValue !== null) {
          totalRow.baselineValue += billRow.baselineValue;
          row.baselineValue += billRow.baselineValue;
        }

        totalRow.totalValue += billRow.totalValue;
        row.totalValue += billRow.totalValue;

        rawData
          .filter((x) => x.billCode === bill.billCode)
          .forEach((item) => {
            if (getDiffDays(item.finishDate, now) >= 1) {
              billRow.planQuantity += item.quantity;
            } else if (getDiffDays(item.startDate, now) >= 1) {
              const totalDays = getDiffDays(item.finishDate, item.startDate);
              const days = getDiffDays(now, item.startDate);

              billRow.planQuantity += (item.quantity * days) / totalDays;
            }
          });

        billRow.planValue = billRow.planQuantity * billRow.price;
        totalRow.planValue += billRow.planValue;
        row.planValue += billRow.planValue;

        return billRow;
      });

    result.push(row);
  });

  return [totalRow, ...result];
}

type InternalData = {
  componentCode: string;
  billCode: string;
  quantity: number;
};

export function buildCompareData(
  bills: Bill[],
  rawData: RawData[],
  elements: ElementApiModel[],
  components: ComponentApiModel[],
  shortcuts: ShortcutApiModel[]
): WorkPackage[] {
  const workPackages = [
    ...new Set(
      bills
        .map((x) => x.workPackage)
        .filter((x) => !isEmptyOrSpaces(x))
        .sort((a, b) => (a >= b ? 1 : -1))
    ),
  ];

  const result: WorkPackage[] = [];

  const totalRow: WorkPackage = {
    code: "TỔNG CỘNG",
    description: "",
    baselineValue: 0,
    totalValue: 0,
    items: [],
    open: true,

    internalValue: 0,
    gapInternalValue: 0,
    wbsValue: 0,
    gapWbsValue: 0,
  };

  const internalData: InternalData[] = [];
  components.forEach((c) => {
    c.activities.forEach((a) => {
      const sc = shortcuts.find((x) => x.idCode === a.idCode);
      if (sc !== undefined) {
        if (sc.billCode !== null) {
          internalData.push({
            componentCode: c.componentCode,
            billCode: sc.billCode,
            quantity: c.totalQuantity * a.quantity,
          });
        }
      }
    });
  });

  workPackages.forEach((w) => {
    const row: WorkPackage = {
      code: w,
      description: elements.find((e) => e.elementCode === w)?.elementName ?? "",
      baselineValue: 0,
      totalValue: 0,
      items: [],
      open: false,

      internalValue: 0,
      gapInternalValue: 0,
      wbsValue: 0,
      gapWbsValue: 0,
    };

    row.items = bills
      .filter((bill) => bill.workPackage === w)
      .map((bill) => {
        const billRow: Item = {
          code: bill.billCode,
          description: bill.description,
          price: bill.price,
          unit: bill.unit,
          baselineQuantity:
            bill.baselineQuantity === 0 ? null : bill.baselineQuantity,
          baselineValue:
            bill.baselineQuantity === 0
              ? null
              : bill.baselineQuantity * bill.price,
          totalQuantity: bill.totalQuantity,
          totalValue: bill.totalQuantity * bill.price,

          internalQuantity: 0,
          internalValue: 0,
          gapInternalQuantity: 0,
          gapInternalValue: 0,
          wbsQuantity: 0,
          wbsValue: 0,
        };

        if (billRow.baselineValue !== null) {
          totalRow.baselineValue += billRow.baselineValue;
          row.baselineValue += billRow.baselineValue;
        }

        totalRow.totalValue += billRow.totalValue;
        row.totalValue += billRow.totalValue;

        //Internal
        internalData
          .filter((x) => x.billCode === bill.billCode)
          .forEach((item) => {
            billRow.internalQuantity += item.quantity;
          });

        billRow.internalValue = billRow.internalQuantity * billRow.price;
        totalRow.internalValue += billRow.internalValue;
        row.internalValue += billRow.internalValue;

        billRow.gapInternalQuantity =
          billRow.internalQuantity - billRow.totalQuantity;
        billRow.gapInternalValue = billRow.gapInternalQuantity * billRow.price;
        billRow.gapInternalPercent =
          billRow.totalQuantity === 0
            ? 0
            : (billRow.gapInternalQuantity / billRow.totalQuantity) * 100;

        totalRow.gapInternalValue += billRow.gapInternalValue;
        row.gapInternalValue += billRow.gapInternalValue;

        //WBS
        rawData
          .filter((x) => x.billCode === bill.billCode)
          .forEach((item) => {
            billRow.wbsQuantity += item.quantity;
          });

        billRow.wbsValue = billRow.wbsQuantity * billRow.price;
        totalRow.wbsValue += billRow.wbsValue;
        row.wbsValue += billRow.wbsValue;

        billRow.gapWbsQuantity = billRow.wbsQuantity - billRow.totalQuantity;
        billRow.gapWbsValue = billRow.gapWbsQuantity * billRow.price;
        billRow.gapWbsPercent =
          billRow.totalQuantity === 0
            ? 0
            : (billRow.gapWbsQuantity / billRow.totalQuantity) * 100;

        totalRow.gapWbsValue += billRow.gapWbsValue;
        row.gapWbsValue += billRow.gapWbsValue;

        return billRow;
      });

    result.push(row);
  });

  return [totalRow, ...result];
}

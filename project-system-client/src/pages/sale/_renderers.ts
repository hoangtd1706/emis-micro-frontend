import Handsontable from "handsontable";
import { formatNumber } from "../../../../../../Ecoba/project-system/project-system-feature/src/utils";
import { BaseRenderer } from "handsontable/renderers";

const getPercentColor = (percent: number): string[] => {
  const p = percent > 0 ? percent : -percent;
  if (p >= 50) return ["#7b1fa2", "#fff"];
  if (p >= 40) return ["#ef5350", "#fff"];
  if (p >= 30) return ["#ffa726", "#3e3e3e"];
  if (p >= 20) return ["#ffca28", "#3e3e3e"];
  if (p >= 10) return ["#fff9c4", "#3e3e3e"];
  return ["#fff", "#3e3e3e"];
};

export function priceRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 0);
}

export function unitRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement
) {
  TD.style.textAlign = "center";
}

export function baseQtyRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 2);
}

export function baseValueRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 0);
}

export function totalQtyRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  TD.style.backgroundColor = "#c8e6c9";
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 2);
}

export function totalValueRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  TD.style.backgroundColor = "#c8e6c9";
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 0);
}

export function qtyRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  TD.style.backgroundColor = "#f9fbe7";
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 2);
}

export function valueRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  TD.style.backgroundColor = "#f9fbe7";
  if (typeof value === "number") TD.innerHTML = formatNumber(value, 0);
}

export function percentRender(
  _instance: Handsontable.Core,
  TD: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) {
  TD.style.backgroundColor = "#f9fbe7";
  if (typeof value === "number") {
    TD.innerHTML = `${formatNumber(value, 1)}%`;
    const colors = getPercentColor(value);
    TD.style.backgroundColor = colors[0];
    TD.style.color = colors[1];
  }
}

export function createRenderer(customRender?: BaseRenderer): BaseRenderer {
  const renderCell = (
    instance: Handsontable.Core,
    TD: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    cellProperties: Handsontable.CellProperties
  ): void => {
    TD.innerHTML = value;
    TD.style.color = "#3e3e3e";
    TD.style.backgroundColor = "#e1f5fe";
    TD.style.whiteSpace = "nowrap";
    TD.style.textOverflow = "ellipsis";
    if (typeof value === "number") TD.style.textAlign = "right";

    if (customRender)
      customRender(instance, TD, row, col, prop, value, cellProperties);

    const rowData = instance.getDataAtRow(row);
    if (rowData[3] !== null) {
      if (col === 1) TD.style.paddingLeft = "18px";
    } else {
      TD.style.backgroundColor = row === 0 ? "#0bff23" : "#ffff0b";
      TD.style.fontWeight = "bold";
    }
  };

  return renderCell;
}

// export const renderCell = (
//   _instance: Handsontable.Core,
//   TD: HTMLTableCellElement,
//   row: number,
//   col: number,
//   _prop: string | number,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   value: any
// ): void => {
//   TD.innerHTML = value;

//   const rowData = _instance.getDataAtRow(row);

//   TD.style.color = "#3e3e3e";

//   TD.style.backgroundColor = "#e1f5fe";

//   if (col < 4) {
//     TD.style.backgroundColor = "#e1f5fe";
//   }

//   if (col >= 4 && col < 6) {
//     TD.style.backgroundColor = "#c8e6c9";
//   }

//   if (col >= 6) {
//     TD.style.backgroundColor = "#f9fbe7";
//   }

//   if (rowData[3] !== null) {
//     if (col === 1) TD.style.paddingLeft = "18px";
//   } else {
//     TD.style.backgroundColor = row === 0 ? "#0bff23" : "#ffff0b";
//     TD.style.fontWeight = "bold";
//   }

//   if (typeof value === "number") TD.style.textAlign = "right";

//   if (col === 2 && value !== null) {
//     TD.innerHTML = formatNumber(value, 0);
//   }

//   if (col > 3 && typeof value === "number") {
//     TD.innerHTML =
//       (col - 4) % 2 === 1 ? formatNumber(value, 0) : formatNumber(value, 2);
//   }

//   if (col === 3) {
//     TD.style.textAlign = "center";
//   }
// };

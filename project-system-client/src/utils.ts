import { SortOrderType } from "handsontable/plugins/multiColumnSorting";

export const isEmptyOrSpaces = function (str: string): boolean {
  return str === undefined || str === null || str.match(/^ *$/) !== null;
};

export const floatFromString = function (str: string): number {
  return parseFloat(str.replace(/,/g, ""));
};

export const intFromString = function (str: string): number {
  return parseInt(str, 10);
};

/**
 * Format date
 * @param date
 * @param formatString
 * dd - Day
 * MM - Month
 * yy - Year
 * yyyy - Full year
 * hh - Hour
 * mm - minute
 * ss - second
 * @returns
 */
export function formatDate(date: Date, formatString = "dd/MM/yyyy"): string {
  let result = formatString;

  const format = [
    {
      symbol: "dd",
      value: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    },
    {
      symbol: "MM",
      value:
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`,
    },
    {
      symbol: "yyyy",
      value: date.getFullYear(),
    },
    {
      symbol: "hh",
      value: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    },
    {
      symbol: "mm",
      value:
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    },
    {
      symbol: "ss",
      value:
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
    },
    {
      symbol: "yy",
      value: `${date.getFullYear()}`.substring(2),
    },
  ];

  format.map((f) => {
    result = result.replace(f.symbol, f.value as string);
    return f.symbol;
  });

  return result;
}

export function formatNumber(
  value: number,
  frac = 0,
  locate = "en-US",
  currency?: string
): string {
  const options: Intl.NumberFormatOptions = {
    currency: currency,
    maximumFractionDigits: frac,
    minimumFractionDigits: frac,
  };
  const numberFormat = new Intl.NumberFormat(locate, options);
  return numberFormat.format(value);
}

export const valueFloatFormat = (value: string | number | null) => {
  if (typeof value === "string") {
    const number = floatFromString(value);
    if (isNaN(number)) return value;

    return formatNumber(number, 2);
  }

  if (typeof value === "number") return formatNumber(value, 2);

  return value;
};

const compare = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
}).compare;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ascCompare = (value: any, newValue: any): 1 | 0 | -1 => {
  if (compare(value, newValue) === 1) return 1;
  if (compare(value, newValue) === -1) return -1;

  return 0;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const descCompare = (value: any, newValue: any): 1 | 0 | -1 => {
  if (compare(value, newValue) === 1) return -1;
  if (compare(value, newValue) === -1) return 1;

  return 0;
};

export function sortFunction(sortOrderType: SortOrderType) {
  if (sortOrderType === "asc") return ascCompare;
  return descCompare;
}

export function getDiffDays(date1: Date, date2: Date): number {
  const date1Cnv = new Date(date1);
  const date2Cnv = new Date(date2);

  date1Cnv.setHours(0, 0, 0, 0);
  date2Cnv.setHours(0, 0, 0, 0);

  const diffTimes = date2Cnv.getTime() - date1Cnv.getTime();
  const diffDays = diffTimes / (1000 * 60 * 60 * 24);

  return diffDays + 1;
}

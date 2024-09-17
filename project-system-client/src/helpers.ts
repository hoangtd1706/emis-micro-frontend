import { isEmptyOrSpaces } from "./utils";
import { ComponentApiModel } from "./services/component.service";
import { ElementApiModel } from "./services/element.service";
import { NetworkApiModel } from "./services/network.service";
import { Bill } from "./services/order.service";
import { ShortcutApiModel } from "./services/shortcut.service";

export type RawData = {
  //scope
  elementCode: string;

  //quantity
  componentCode: string;
  idCode: string;
  quantity: number;

  //sale
  billCode: string;

  //schedule
  networkCode: string;
  startDate: Date;
  finishDate: Date;
};

export const buildRawData = (
  elements: ElementApiModel[],
  components: ComponentApiModel[],
  shortcuts: ShortcutApiModel[],
  bills: Bill[],
  networks: NetworkApiModel[]
): RawData[] => {
  const result: RawData[] = [];
  elements
    .filter((x) => x.level === 7)
    .sort((a, b) => (a.elementCode >= b.elementCode ? 1 : -1))
    .forEach((item) => {
      const component = components.find((x) =>
        x.mappings.map((m) => m.elementCode).includes(item.elementCode)
      );
      if (component !== undefined) {
        component.activities.forEach((act) => {
          const sc = shortcuts.find((s) => s.idCode === act.idCode);
          if (sc !== undefined && !isEmptyOrSpaces(sc.billCode)) {
            const bill = bills.find(
              (x) =>
                x.billCode === sc.billCode &&
                item.elementCode.startsWith(x.workPackage)
            );
            const network = networks.find((x) =>
              x.shortcuts.map((s) => s.idCode).includes(sc.idCode)
            );
            if (bill !== undefined && network !== undefined) {
              const networkElement = network.elements.find((x) =>
                item.elementCode.startsWith(x.elementCode)
              );
              if (networkElement !== undefined) {
                const row: RawData = {
                  elementCode: item.elementCode,

                  componentCode: component.componentCode,
                  idCode: sc.idCode,
                  quantity: act.quantity,

                  billCode: sc.billCode,

                  networkCode: network.networkCode,
                  startDate: new Date(networkElement.startDate),
                  finishDate: new Date(networkElement.finishDate),
                };

                result.push(row);
              }
            }
          }
        });
      }
    });
  return result;
};

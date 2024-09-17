import React from "react";
import { useLocation, useMatch, useMatches, useParams } from "react-router-dom";
import { ColumnSettings } from "handsontable/settings";
import { HotColumn } from "@handsontable/react";

import { formatDate } from "../../utils";
import { apiStatuses } from "../../dictionary";

import { DataTableStl, HotTableStl, PageStl } from "../../components/styled";

import orderService, { Bill, Order } from "../../services/order.service";
import elementService, {
    ElementApiModel,
} from "../../services/element.service";

import CodeColumn, { SaleToolbar } from "./_components";

import { buildOrdersData } from "./_dataBuilder";

import {
    Row,
    WorkPackage,
    baseColumns,
    createColumn,
    getBaseHeaders,
    getUnit,
    renderData,
} from "./_utils";
import { qtyRender, valueRender } from "./_renderers";

const buildColumns = (subContracts: Order[]): ColumnSettings[] => {
    const result = [...baseColumns];

    subContracts.forEach((x) => {
        result.push(
            createColumn(`${x.orderNumber}_qty`, 100, qtyRender),
            createColumn(`${x.orderNumber}_value`, 130, valueRender)
        );
    });

    return result;
};

export default function Orders(): JSX.Element {
    const match = useMatch(
        `/projects/:projectCode/sale`
    );
    const projectCode = match?.params.projectCode

    const [data, setData] = React.useState<Row[] | null>(null);
    const [elements, setElements] = React.useState<ElementApiModel[] | null>(
        null
    );
    const [firstContract, setFirstContract] = React.useState<Order | null>(null);
    const [bills, setBills] = React.useState<Bill[] | null>(null);
    const [subContracts, setSubContracts] = React.useState<Order[] | null>(null);

    const [workPackages, setWorkPackages] = React.useState<WorkPackage[] | null>(
        null
    );

    const [ratio, setRatio] = React.useState<number>(1);

    const handleOpenNode = (node: string) => {
        if (workPackages !== null) {
            setWorkPackages(
                workPackages.map((x) => {
                    if (x.code === node) {
                        x.open = !x.open;
                        return x;
                    }
                    return x;
                })
            );
        }
    };

    const refresh = async () => {
        if (projectCode === undefined) return;

        // setStatus(true, apiStatuses.FETCHING_DATA);
        try {
            const res = await Promise.all([
                orderService.getByProject(projectCode),
                elementService.getItemsAsync(projectCode),
            ]);
            console.log(res);
            const orders = res[0];
            const elements = res[1];

            const first = orderService.getFirstOrder(orders);
            if (first !== null) {
                const bills = orderService.getBillsFromOrders(orders);
                const subs = orders.filter((x) => x.orderNumber !== first.orderNumber);

                setFirstContract(first);
                setSubContracts(subs);
                setElements(elements);
                setBills(bills);
            } else {
                setFirstContract(null);
                setSubContracts(null);
                setElements(null);
                setBills(null);
            }
        } catch {
            setFirstContract(null);
            setSubContracts(null);
            setElements(null);
            setBills(null);
            // showAlert("error", apiStatuses.FETCH_DATA_FAILURE);
        } finally {
            // setStatus(false, "");
        }
    };

    React.useEffect(() => {
        refresh();
    }, [projectCode]);

    React.useEffect(() => {
        if (elements !== null && subContracts !== null && bills !== null) {
            setWorkPackages(buildOrdersData(elements, subContracts, bills));
        } else {
            setWorkPackages(null);
        }
    }, [elements, subContracts, bills]);

    React.useEffect(() => {
        setData(renderData(workPackages, ratio));
    }, [workPackages, ratio]);

    return (
        <PageStl>
            <SaleToolbar
                ratio={ratio}
                onRefresh={refresh}
                onShowParent={() => {
                    if (workPackages !== null) {
                        setWorkPackages(workPackages.map((x) => ({ ...x, open: false })));
                    }
                }}
                onShowChildren={() => {
                    if (workPackages !== null) {
                        setWorkPackages(workPackages.map((x) => ({ ...x, open: true })));
                    }
                }}
                onChangeRatio={setRatio}
            />
            <DataTableStl>
                {firstContract && subContracts && data && (
                    <HotTableStl
                        height="100%"
                        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
                        readOnly={true}
                        data={data}
                        rowHeaders={true}
                        manualColumnResize={true}
                        autoColumnSize={false}
                        autoRowSize={false}
                        fixedColumnsStart={6}
                        nestedHeaders={[
                            [
                                ...getBaseHeaders(firstContract, ratio, 0),
                                ...subContracts.map((x) => ({
                                    label: x.contractCode,
                                    colspan: 2,
                                })),
                            ],
                            [
                                ...getBaseHeaders(firstContract, ratio, 1),
                                ...subContracts.map((x) => ({
                                    label: x.orderNumber,
                                    colspan: 2,
                                })),
                            ],
                            [
                                ...getBaseHeaders(firstContract, ratio, 2),
                                ...subContracts.map((x) => ({
                                    label: formatDate(new Date(x.contractSigningDate)),
                                    colspan: 2,
                                })),
                            ],
                            [
                                ...getBaseHeaders(firstContract, ratio, 3),
                                ...subContracts.map((_x, i) => ({
                                    label: `Phụ lục ${i + 1}`,
                                    colspan: 2,
                                })),
                            ],
                            [
                                ...getBaseHeaders(firstContract, ratio),
                                ...new Array(subContracts.length * 2)
                                    .fill(1)
                                    .map((x, i) =>
                                        i % 2 === 0
                                            ? "Khối lượng"
                                            : `Thành tiền (${getUnit(ratio)})`
                                    ),
                            ],
                        ]}
                    >
                        <HotColumn width={120} data="code">
                            <CodeColumn
                                hot-renderer
                                workPackages={workPackages}
                                onClick={(w: string) => {
                                    handleOpenNode(w);
                                }}
                            />
                        </HotColumn>
                        {buildColumns(subContracts).map((c, i) => (
                            <HotColumn
                                key={i}
                                data={c.data}
                                width={c.width}
                                renderer={c.renderer}
                                columnSorting={c.columnSorting}
                            />
                        ))}
                    </HotTableStl>
                )}
            </DataTableStl>
        </PageStl>
    );
}

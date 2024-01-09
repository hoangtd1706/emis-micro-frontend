import { Route, Routes } from "react-router-dom";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";

import NotFound from "../components/NotFound";

//#region Sale
import Orders from "./sale/Orders";
import Status from "./sale/Status";
import Payments from "./sale/Payments";
import Compare from "./sale/Compare";
import Shortcuts from "./sale/Shortcuts";

//#endregion

//#region Scope
import Elements from "./scope/Elements";
import Quantity from "./scope/Quantity";
import Summary from "./scope/Summary";
import Value from "./scope/Value";
import Confirmation from "./scope/Confirmation";

//#endregion

//#region Quantity
import Components from "./quantity/Components";
import Activities from "./quantity/Activities";
import Mappings from "./quantity/Mappings";
import TotalQuantityReport from "./quantity/TotalQuantityReport";
import SumQuantityByElementReport from "./quantity/SumQuantityByElementReport";
import UploadManagement from "./quantity/UploadManagement";
import ShortcutReport from "./quantity/ShortcutReport";

//#endregion

//#region Version
import Requests from "./version/Requests";
import Versions from "./version/Versions";

//#endregion

//#region Schedule
import Networks from "./schedule/Networks";
import NetworkElements from "./schedule/NetworkElements";
import NetworkShortcuts from "./schedule/NetworkShortcuts";
import NetworkStatus from "./schedule/NetworkStatus";
import MasterSchedule from "./schedule/MasterSchedule";

//#endregion

//#region Pfm03
import Pfm03GapReport from "./report/Pfm03GapReport";
import Pfm03OverviewReport from "./report/Pfm03OverviewReport";
import Pfm03CashInGapReport from "./report/Pfm03CashInGapReport";

//#endregion

import { IProjectPage } from "../components/types";

import ProjectLayout from "../components/ProjectLayout";
import Integrated from "./scope/Integrated";
import Overview from "./schedule/Overview";
import ActivityConfirmation from "./confirmation/ActivityConfirmation";

registerAllModules();

const salePages: IProjectPage = {
  path: "sale",
  icon: "cart-plus",
  label: "Hợp đồng A",
  subs: [
    { path: "sale/status", icon: "percentage", label: "Báo cáo hoàn thành" },
    { path: "sale/ipc", icon: "file-invoice", label: "Báo cáo IPC" },
    { path: "sale/compare", icon: "not-equal", label: "So sánh nội bộ" },
    // { path: "sale/detail", icon: "list-alt", label: "Chi tiết phân bổ WBS" },
    // { path: "sale/schedule", icon: "stream", label: "Tiến độ phân kỳ" },
    // {
    //   path: "sale/confirmation",
    //   icon: "flag-checkered",
    //   label: "Hoàn thành phân kỳ",
    // },
  ],
};

const scopePages: IProjectPage = {
  path: "scope",
  icon: "sitemap",
  label: "WBS",
  subs: [
    {
      path: "scope/elements",
      icon: "cloud-upload-alt",
      label: "Upload WBS",
    },
    {
      path: "scope/confirmations",
      icon: "check-circle",
      label: "Xác nhận hoàn thành",
    },
    {
      path: "scope/activity-confirmations",
      icon: "tasks",
      label: "Xác nhận checklist",
    },
    // { path: "scope/quantity", icon: "list-alt", label: "Phân rã khối lượng" },
    {
      path: "scope/value-report",
      icon: "dollar-sign",
      label: "Giá trị theo WBS",
    },
  ],
};

const quantityPages: IProjectPage = {
  path: "quantity",
  icon: "drafting-compass",
  label: "Khối lượng",
  subs: [
    {
      path: "quantity/components",
      icon: "cubes",
      label: "Danh mục cấu kiện điển hình",
    },
    {
      path: "quantity/activities",
      icon: "list-ul",
      label: "Khối lượng cấu kiện điển hình",
    },
    { path: "quantity/shortcuts", icon: "code", label: "Danh mục ID Code" },
    { path: "quantity/mappings", icon: "link", label: "Mapping WBS-CK" },
    {
      path: "quantity/sum-quantity-by-wbs-report",
      icon: "sitemap",
      label: "Tổng hợp theo WBS",
    },
    {
      path: "quantity/total-quantity-report",
      icon: "file-excel",
      label: "Tổng hợp khối lượng theo CKĐH",
    },
    {
      path: "quantity/shortcuts-report",
      icon: "file-excel",
      label: "Tổng hợp khối lượng theo ID",
    },
  ],
};

const schedulePages: IProjectPage = {
  path: "schedule",
  icon: "stream",
  label: "Tiến độ",
  subs: [
    {
      path: "schedule/master",
      icon: "flag",
      label: "Tiến độ tổng thể",
    },
    {
      path: "schedule/networks",
      icon: "route",
      label: "Trình tự thi công",
    },
    {
      path: "schedule/elements",
      icon: "bezier-curve",
      label: "Gắn tiến độ",
    },
    {
      path: "schedule/shortcuts",
      icon: "code",
      label: "Mapping đầu việc",
    },
    {
      path: "schedule/status",
      icon: "percentage",
      label: "Báo cáo phần trăm",
    },
  ],
};

const reportPages: IProjectPage = {
  path: "report",
  icon: "file-alt",
  label: "Báo cáo PFM03",
  subs: [
    {
      path: "report/baseline",
      icon: "file",
      label: "Kế hoạch ban đầu",
    },
    {
      path: "report/rebaseline",
      icon: "file",
      label: "Kế hoạch điều chỉnh",
    },
    {
      path: "report/forecast",
      icon: "file",
      label: "Thực tế/Dự báo",
    },
    {
      path: "report/work-done",
      icon: "file",
      label: "Báo cáo GAP Sản lượng",
    },
    {
      path: "report/revenue",
      icon: "file",
      label: "Báo cáo GAP Doanh thu",
    },
    {
      path: "report/cash-in",
      icon: "file",
      label: "Báo cáo GAP Tiền về",
    },
  ],
};

const versionPages: IProjectPage = {
  path: "version",
  icon: "code-branch",
  label: "Quản lý phiên bản",
  subs: [
    {
      path: "version/requests",
      icon: "thumbs-up",
      label: "Phê duyệt phiên bản",
    },
  ],
};

export const projectFeatures: IProjectPage[] = [
  salePages,
  scopePages,
  quantityPages,
  schedulePages,
  reportPages,
  versionPages,
];

export default function ProjectDetail() {
  return (
    <ProjectLayout pages={projectFeatures}>
      <Routes>
        <Route path="sale">
          <Route index element={<Orders />} />
          <Route path="status" element={<Status />} />
          <Route path="ipc" element={<Payments />} />
          <Route path="compare" element={<Compare />} />
          {/* <Route path="detail" element={<Detail />} /> */}
          {/* <Route path="schedule" element={<Schedule />} /> */}
          {/* <Route path="confirmation" element={<BillConfirmation />} /> */}
        </Route>

        <Route path="scope">
          <Route index element={<Summary />} />
          <Route path="elements" element={<Elements />} />
          <Route path="quantity" element={<Quantity />} />
          <Route path="confirmations/*" element={<Confirmation />} />
          <Route
            path="activity-confirmations/*"
            element={<ActivityConfirmation />}
          />
          <Route path="value-report" element={<Value />} />
        </Route>

        <Route path="quantity">
          <Route index element={<UploadManagement />} />
          <Route
            path="total-quantity-report"
            element={<TotalQuantityReport />}
          />
          <Route path="components" element={<Components />} />
          <Route path="activities/*" element={<Activities />} />
          <Route path="mappings" element={<Mappings />} />
          <Route
            path="sum-quantity-by-wbs-report"
            element={<SumQuantityByElementReport />}
          />
          <Route path="shortcuts" element={<Shortcuts />} />
          <Route path="shortcuts-report" element={<ShortcutReport />} />
        </Route>

        <Route path="schedule">
          <Route index element={<Overview />} />
          <Route path="master" element={<MasterSchedule />} />
          <Route path="networks" element={<Networks />} />
          <Route path="elements/*" element={<NetworkElements />} />
          <Route path="shortcuts" element={<NetworkShortcuts />} />
          <Route path="status/*" element={<NetworkStatus />} />
        </Route>

        <Route path="report">
          <Route index element={<Pfm03GapReport reportType={1} />} />
          <Route path="work-done" element={<Pfm03GapReport reportType={1} />} />
          <Route path="revenue" element={<Pfm03GapReport reportType={2} />} />
          <Route path="cash-in" element={<Pfm03CashInGapReport />} />
          <Route
            path="baseline"
            element={<Pfm03OverviewReport versionType={1} />}
          />
          <Route
            path="rebaseline"
            element={<Pfm03OverviewReport versionType={2} />}
          />
          <Route
            path="forecast"
            element={<Pfm03OverviewReport versionType={3} />}
          />
        </Route>

        <Route path="version">
          <Route index element={<Versions />} />
          <Route path="requests" element={<Requests />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProjectLayout>
  );
}

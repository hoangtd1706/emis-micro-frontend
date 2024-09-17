import React from "react"
import { AlignRightOutlined, ApartmentOutlined, BlockOutlined, BranchesOutlined, FundOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { IProjectPage } from "./types";

const salePages: IProjectPage = {
  path: "sale",
  icon: <ShoppingCartOutlined />,
  label: "Hợp đồng A",
  subs: [
    // { path: "sale/status", icon: "percentage", label: "Báo cáo hoàn thành" },
    // { path: "sale/ipc", icon: "file-invoice", label: "Báo cáo IPC" },
    // { path: "sale/compare", icon: "not-equal", label: "So sánh nội bộ" },
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
  icon: <ApartmentOutlined />,
  label: "WBS",
  subs: [
    // {
    //   path: "scope/elements",
    //   icon: "cloud-upload-alt",
    //   label: "Upload WBS",
    // },
    // {
    //   path: "scope/confirmations",
    //   icon: "check-circle",
    //   label: "Xác nhận hoàn thành",
    // },
    // {
    //   path: "scope/activity-confirmations",
    //   icon: "tasks",
    //   label: "Xác nhận checklist",
    // },
    // { path: "scope/quantity", icon: "list-alt", label: "Phân rã khối lượng" },
    // {
    //   path: "scope/value-report",
    //   icon: "dollar-sign",
    //   label: "Giá trị theo WBS",
    // },
  ],
};

const quantityPages: IProjectPage = {
  path: "quantity",
  icon: <BlockOutlined />,
  label: "Khối lượng",
  subs: [
    // {
    //   path: "quantity/components",
    //   icon: "cubes",
    //   label: "Danh mục cấu kiện điển hình",
    // },
    // {
    //   path: "quantity/activities",
    //   icon: "list-ul",
    //   label: "Khối lượng cấu kiện điển hình",
    // },
    // { path: "quantity/shortcuts", icon: "code", label: "Danh mục ID Code" },
    // { path: "quantity/mappings", icon: "link", label: "Mapping WBS-CK" },
    // {
    //   path: "quantity/sum-quantity-by-wbs-report",
    //   icon: "sitemap",
    //   label: "Tổng hợp theo WBS",
    // },
    // {
    //   path: "quantity/total-quantity-report",
    //   icon: "file-excel",
    //   label: "Tổng hợp khối lượng theo CKĐH",
    // },
    // {
    //   path: "quantity/shortcuts-report",
    //   icon: "file-excel",
    //   label: "Tổng hợp khối lượng theo ID",
    // },
  ],
};

const schedulePages: IProjectPage = {
  path: "schedule",
  icon: <AlignRightOutlined />,
  label: "Tiến độ",
  subs: [
    // {
    //   path: "schedule/master",
    //   icon: "flag",
    //   label: "Tiến độ tổng thể",
    // },
    // {
    //   path: "schedule/networks",
    //   icon: "route",
    //   label: "Trình tự thi công",
    // },
    // {
    //   path: "schedule/elements",
    //   icon: "bezier-curve",
    //   label: "Gắn tiến độ",
    // },
    // {
    //   path: "schedule/shortcuts",
    //   icon: "code",
    //   label: "Mapping đầu việc",
    // },
    // {
    //   path: "schedule/status",
    //   icon: "percentage",
    //   label: "Báo cáo phần trăm",
    // },
  ],
};

const reportPages: IProjectPage = {
  path: "report",
  icon: <FundOutlined />,
  label: "Báo cáo PFM03",
  subs: [
    // {
    //   path: "report/baseline",
    //   icon: "file",
    //   label: "Kế hoạch ban đầu",
    // },
    // {
    //   path: "report/rebaseline",
    //   icon: "file",
    //   label: "Kế hoạch điều chỉnh",
    // },
    // {
    //   path: "report/forecast",
    //   icon: "file",
    //   label: "Thực tế/Dự báo",
    // },
    // {
    //   path: "report/work-done",
    //   icon: "file",
    //   label: "Báo cáo GAP Sản lượng",
    // },
    // {
    //   path: "report/revenue",
    //   icon: "file",
    //   label: "Báo cáo GAP Doanh thu",
    // },
    // {
    //   path: "report/cash-in",
    //   icon: "file",
    //   label: "Báo cáo GAP Tiền về",
    // },
  ],
};

const versionPages: IProjectPage = {
  path: "version",
  icon: <BranchesOutlined />,
  label: "Quản lý phiên bản",
  subs: [
    // {
    //   path: "version/requests",
    //   icon: "thumbs-up",
    //   label: "Phê duyệt phiên bản",
    // },
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

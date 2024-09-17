
import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { WorkPackage } from "./_utils";
import { ToolbarStl } from "../../components/styled";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CodeColumn(props: any) {
  const workPackages = props.workPackages as WorkPackage[];
  const workPackage = workPackages.find((x) => x.code === props.value);
  return (
    <div
      style={{
        fontWeight: "bold",
        height: "100%",
        padding: "0px 4px",
        paddingLeft: workPackage !== undefined ? "4px" : "16px",
        backgroundColor:
          props.row === 0
            ? "#0bff23"
            : workPackage !== undefined
              ? "#ffff0b"
              : "#e1f5fe",
      }}
      className="custom-column"
    >
      {workPackage && workPackage?.items.length > 0 && (
        <MinusCircleOutlined />
        // <FontAwesomeIcon
        //   style={{ fontSize: 15, marginRight: 4 }}
        //   icon={
        //     workPackage.open ? ["far", "minus-square"] : ["far", "plus-square"]
        //   }
        //   onClick={() => {
        //     props.onClick(props.value);
        //   }}
        // />
      )}
      {props.value}{" "}
    </div>
  );
}

export type SaleToolbarProps = {
  ratio: number;
  onRefresh: () => void;
  onShowParent: () => void;
  onShowChildren: () => void;
  onChangeRatio: (ratio: number) => void;
};

export function SaleToolbar({
  ratio,
  onRefresh,
  onShowParent,
  onShowChildren,
  onChangeRatio,
}: SaleToolbarProps): JSX.Element {
  return (
    <ToolbarStl>
      {/* <ToolbarButton
        label=""
        icon="sync-alt"
        onClick={() => {
          onRefresh();
        }}
      />
      <ToolbarButton label="1" onClick={onShowParent} />
      <ToolbarButton label="2" onClick={onShowChildren} /> */}
    </ToolbarStl>
  );
}

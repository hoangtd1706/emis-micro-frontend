import styled from "styled-components";
import { HotTable } from "@handsontable/react";

export const SearchBarHomeStl = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  justify-content: center;
`;

export const GridTemplateStl = styled.div<{
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 100%;
  // Breakpoint xs
  @media (min-width: 0px) {
    grid-template-columns: repeat(${({ xs }) => xs}, 1fr);
  }

  // Breakpoint sm
  @media (min-width: 600px) {
    grid-template-columns: repeat(${({ sm }) => sm}, 1fr);
  }

  // Breakpoint md
  @media (min-width: 900px) {
    grid-template-columns: repeat(${({ md }) => md}, 1fr);
  }

  // Breakpoint lg
  @media (min-width: 1200px) {
    grid-template-columns: repeat(${({ lg }) => lg}, 1fr);
  }

  // Breakpoint xl
  @media (min-width: 1536px) {
    grid-template-columns: repeat(${({ xl }) => xl}, 1fr);
  }
`;

export const PageStl = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 16px;
`;

export const ToolbarStl = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 30px;
  width: 100%;
  border: 1px solid rgb(204, 204, 204);
  border-bottom: 0;
  padding-left: 4px;
  /* background-color: rgb(240, 240, 240); */
  background-color: white;
  flex-direction: row;
`;

export const DataTableStl = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  background-color: rgb(191, 191, 191);
`;

export const VContainerStl = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
`;

export const HContainerStl = styled.div`
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: row;
  overflow: hidden;
`;

export const SidePanelStl = styled.div`
  width: 300px;
  background: #fff;
  overflow-y: overlay;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: inherit;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    opacity: 0.7;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }
`;

export const HotTableStl = styled(HotTable)`
  > div > div::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /* Track */
  > div > div::-webkit-scrollbar-track {
    background: inherit;
  }

  /* Handle */
  > div > div::-webkit-scrollbar-thumb {
    background: #888;
    opacity: 0.7;
    border-radius: 4px;
  }

  /* Handle on hover */
  > div > div::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }

  th .colHeader {
    font-weight: 600;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  td:has(> div > div.custom-column) {
    padding: 0;
    > div {
      height: 100%;
    }
  }

  td:has(> div > div.period-column) {
    padding: 0;
    border-right: 0;
    > div {
      height: 100%;
      width: 100%;
    }
  }
`;

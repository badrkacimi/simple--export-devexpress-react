import React, { useCallback, useRef } from "react";
import {
  PagingState,
  IntegratedPaging,
  RowDetailState,
  EditingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableRowDetail,
  TableEditColumn
} from "@devexpress/dx-react-grid-bootstrap4";
import { Getter } from "@devexpress/dx-react-core";
import { Card } from "react-bootstrap";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  FILE_NAME,
  LISTE_NAME,
  LISTE_TYPE
} from "../../xxxx/resources/constants";
import { columns, exportedColumns } from "./columns";
import Button from "../../../../../components/ui-kit-components/Button";
import {
  TableHeadComponent,
  TableComponent,
  PagingContainer,
  NoDataCell
} from "../../../../../components/commun/Table";
import LoadingIndicator from "../../../../../components/ui-kit-components/LoadingIndicator";
import EventsTable from "../EventsTable";
import ActionsComponent from "./actionsComponent";
import { Exporter } from "../../../../../components/commun/ExportExcel/Exporter";
import ActionGroup from "../../../../../components/commun/ActionGroup";


    // delete code for brievty

const TableData = ({ page, size, updateTableState, rows, isLoading }) => {
  const exporterRef = useRef(null);
  const startExport = useCallback(
    options => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );
  
  
  return (
    <Card className="p-4">
      <ActionGroup padding="0" justify="end">
        <Button
          className="mb-2"
          width="130px"
          margin="0"
          label="export"
          variant="outlinedWhite"
          onClick={startExport}
          iconName="icon_exporter.png"
        />
      </ActionGroup>
      <Grid rows={rows} columns={columns}>
        
    // delete code for brievty
        
      <Exporter
        exporterRef={exporterRef}
        listName={LISTE_NAME}
        listetype={LISTE_TYPE}
        datatoExport={rows}
        columns={exportedColumns}
        fileName={FILE_NAME}
      />
    </Card>
  );
};

export default TableData;

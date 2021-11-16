import React from "react";
import saveAs from "file-saver";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import { translate } from "../IntlGlobalProvider";

export const Exporter = ({
  datatoExport,
  listName,
  listetype,
  columns,
  exporterRef,
  fileName
}) => {
  const customizeHeader = worksheet => {
    const generalStyles = {
      font: { bold: true },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d2b98c" },
        bgColor: { argb: "d2b98c" }
      },
      alignment: { horizontal: "left" }
    };

    for (let rowIndex = 1; rowIndex < 4; rowIndex += 1) {
      worksheet.mergeCells(rowIndex, 1, rowIndex, 4);

      Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
      Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
    }
    worksheet.getRow(1).height = 20;
    worksheet.getRow(1).getCell(1).font = { italic: true, size: 12 };
    worksheet.getRow(1).getCell(2).numFmt = "d mmmm yyyy";
    worksheet.getRow(2).getCell(1).font = { bold: true, size: 13 };
    worksheet.getRow(3).getCell(1).font = { bold: true, size: 13 };

    worksheet.getColumn(1).values = [
      new Date(),
      "Produit :  " + listName,
      "Liste : " + listetype
    ];
    worksheet.addRow({});
  };
  const onSave = workbook => {
    workbook.xlsx.writeBuffer().then(buffer => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${fileName}.xlsx`
      );
    });
  };

  let tempColums = columns.map(column => {
    return {
      name: column.name,
      title: translate(column.title),
      getCellValue: column.getCellValue
    };
  });

  return (
    <GridExporter
      ref={exporterRef}
      rows={datatoExport}
      columns={tempColums}
      onSave={onSave}
      customizeHeader={customizeHeader}
    />
  );
};

import React, { useContext } from "react";
import DataBody from "./DataBody";
import "../styles/DataTable.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataTable = () => {
  const context = useContext(DataAreaContext);

  return (

    <div className="datatable mt-2">
      <table
        id="table"
        className="table table-hover"
      >
        <thead>
          <tr>
            {context.developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className="col colHead"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    context.handleSort(name.toLowerCase());
                    context.handleSort(name);
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })} 
          </tr>
        </thead>

        <DataBody />
      </table>
    </div>
  );
}

export default DataTable;

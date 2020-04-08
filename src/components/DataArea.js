import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import SearchName from "./SearchName";
import API from "../utils/API";
import "../styles/DataArea.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    employees: [],
    order: "ascend",
    filteredEmployees: [],
    headings: [
      { name: "name (l,f)", width: "15%", order: "ascend" },
      { name: "email", width: "15%", order: "ascend" },
      { name: "state", width: "15%", order: "ascend" },
      { name: "age", width: "10%", order: "ascend" },
      { name: "image", width: "10%", order: "ascend" }
    ]
  });

  const handleSort = heading => {
    let currentOrder = developerState.headings
      .filter(elem => elem.name === heading)
      .map(elem => elem.order)
      .toString();
    
      if (currentOrder === "descend") {
        currentOrder = "ascend";
      } else {
        currentOrder = "descend";
      }

    const compareFnc = (a, b) => {
      if (currentOrder === "ascend") {
    
          if (a[heading] === undefined && heading !== "age" && heading !== "state" && heading !== "name (l,f)") {
            return 1;
          } else if (b[heading] === undefined && heading !== "age" && heading !== "state" && heading !== "name (l,f)") {
            return -1;
          }

        if (heading === "name (l,f)") {
          return a["name"].last.localeCompare(b["name"].last);
        } else if (heading === "age") {
          return a["dob"].age - b["dob"].age;
        } else if (heading == "state") {
          return a["location"].state.localeCompare(b["location"].state);
        } else {
          return a[heading].localeCompare(b[heading]);
        }
        } else {
          if (a[heading] === undefined && heading !== "age" && heading !== "state" && heading !== "name (l,f)") {
            return 1;
          } else if (b[heading] === undefined && heading !== "age" && heading !== "state" && heading !== "name (l,f)") {
            return -1;
          }
        if (heading === "name (l,f)") {
          return b["name"].last.localeCompare(a["name"].last);
        } else if (heading === "age") {
          return b["dob"].age - a["dob"].age;
        } else if (heading=="state") {
          return b["location"].state.localeCompare(a["location"].state);
        } else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    
    const sortedEmployees = developerState.filteredEmployees.sort(compareFnc);
    const updatedHeadings = developerState.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });
  
    setDeveloperState({
      ...developerState,
      filteredEmployees: sortedEmployees,
      headings: updatedHeadings
    });
  };

  const handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.employees.filter(item => {
      let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
      console.log(filter, values)
      if (values.indexOf(filter.toLowerCase()) !== -1) {
        return item
      };
    });

    setDeveloperState({ ...developerState, filteredEmployees: filteredList });
  };

  useEffect(() => {
    API.getEmployees().then(results => {
      console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        employees: results.data.results,
        filteredEmployees: results.data.results
      });
    });
  }, []);

  return (
    <DataAreaContext.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <SearchName />
      <div className="data-area">
        {developerState.filteredEmployees.length > 0 ? <DataTable /> : <div></div>}
      </div>
    </DataAreaContext.Provider>
  );
};

export default DataArea;

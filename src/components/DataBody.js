import React, { useContext } from "react";
import "../styles/DataBody.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataBody = () => {
  const context = useContext(DataAreaContext);

  return (
    <tbody>
      {context.developerState.filteredEmployees[0] !== undefined && context.developerState.filteredEmployees[0].name !== undefined ? (
        context.developerState.filteredEmployees.map(({ login, picture, name, location, email, dob }) => {
          return (
            <tr key={login.uuid}>
              <td className="name-cell align-middle">
                {name.last}, {name.first}
              </td>
              <td className="align-middle">
                <a href={"mailto:" + email} target="__blank">
                  {email}
                </a>
              </td>
              <td className="align-middle">
                {location.state}
              </td>
              <td className="align-middle">
                {dob.age}
              </td>
              <td className="align-middle">
                <img
                  src={picture.medium}
                  alt={"profile image"}
                  className="img-responsive img-circle alignCenter"
                />
              </td>
            </tr>
          );
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}

export default DataBody;

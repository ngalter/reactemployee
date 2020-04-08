import axios from "axios";

export default {
  // Gets all users
  getEmployees: function() {

    return axios.get("https://randomuser.me/api/?results=10&nat=us");
  }
};

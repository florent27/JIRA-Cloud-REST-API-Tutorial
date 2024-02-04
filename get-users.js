const fs = require('fs').promises;
var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};
const path = 'storage/users.json'
//Gets all users within a project using Jira Cloud REST API
async function getUsers() {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';
    const lurl =  baseUrl + '/rest/api/3/users'
    console.log(lurl)
    const config = {
      method: 'get',
      url: lurl,
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.request(config);
    const ldata = response. data
    await fs.writeFile(path, JSON.stringify(ldata, null, 4))
    return ldata;
  } catch (error) {
    console.log('error: ')
    console.log(error.response)
  }
}

module.exports = getUsers;
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

const path = 'storage/projects.json'

//Gets all issues in a particular project using the Jira Cloud REST API
async function getProjects() {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const config = {
      method: 'get',
      url: baseUrl + '/rest/api/3/project',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.request(config);
    const ldata = response.data
    await fs.writeFile(path, JSON.stringify(ldata, null, 4))
    return ldata;
  } catch (error) {
    console.log('error: ')
    console.log(error.message)
  }
}

module.exports = getProjects;
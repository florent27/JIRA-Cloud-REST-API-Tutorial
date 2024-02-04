const fs = require('fs').promises;
var axios = require('axios');
const { lstat } = require('fs');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};

const path = 'storage/issues.json'
//Gets all issues in a particular project using the Jira Cloud REST API
async function getIssues() {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const config = {
      method: 'get',
      url: baseUrl + '/rest/api/3/search?MaxResult=1000',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };

    const response = await axios.request(config);
    const ldata = response.data
    
    //console.log(ldata)
    const ljson = JSON.stringify(ldata, null, 4)
    
    await fs.writeFile(path, ljson)
    const data = JSON.parse(await fs.readFile(path, "utf8"))
    let i = 0
    console.log(data['total'])
    //console.log(data['issues'])
    for (const iterator of data['issues']) {
      console.log('*-----------------')
      console.log(iterator)
      console.log('*-----------------')
    }
    for (const key in data) {
      console.log('-----------------')
      if (Object.hasOwnProperty.call(data, key)) {
        console.log(key)
        const element = data[key];
        if (i === 0){
          //console.log(element)
          //i = 1 
        }
        
      }
      console.log('-----------------')
    }
    return ljson;
  
  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
}

module.exports = getIssues;
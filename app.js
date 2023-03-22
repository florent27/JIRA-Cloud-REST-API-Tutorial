const createIssue = require('./create-issue.js');
const createProject = require('./create-project.js');
const getIssueByID = require('./get-issue-by-id.js');
const getIssues = require('./get-issues.js');
const getTransitions = require('./get-transitions.js');
const getUsers = require('./get-users.js');
const updateStatus = require('./update-status.js');
const getProjects = require('./get-projects.js')

// Common call pattern 1: create project, create issue in that project, and move that 
// issue into in progress. This function will do exactly as described in the previous sentence 
// by making 3 async calls to different functions which we imported at the top. See function logic 
// in the individual function files which are named as obviously as possible :) 
const createProjectIssueAndUpdate = async () => {

  const projectName = process.env.PROJECT_NAME
  const projectKey = await createProject(projectName);
  console.log(`Created project with key: ${projectKey}`);

  // When creating an issue, we need the following parameters, issueType, summary, and description. 
  // Read more about this on the JIRA Cloud REST API docs: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post
  const issueType = 'Task';
  const summary = 'Horea Porutiu is awesome';
  const description = 'super awesome!'

  // Note that we are using the project key which will be auto created in the above function call
  const issueKey = await createIssue(projectKey, issueType, summary, description);
  console.log(`Created issue with key: ${issueKey}`);

  // Notes about statusID: statusID corresponds to " 11 == "To Do", 21=="In Progress", 31=="In Review", 41=="Done"
  // for more info on statusID use the `get-transtions.js` file to see all available transitions
  // since we are hard coding `21` below this means we will update the issue to In Progress
  const statusID = '21'

  // Add issueKey you want to update. This will be the key which we autogenerated from the issue above.
  const update = await updateStatus(issueKey, statusID);
  console.log(update)
}

//This will output the most recent projects
const getRecentProjects = async () => {
  const recentProjects = await getProjects();
  console.log(recentProjects)
}

//This will list all issues for a project
const getIssuesFunc = async () => {
  const issues = await getIssues();
  console.log(issues)
}

// This will list all transitions for a project, make sure to change the issueKey to correspond
// with your project! 
const getTransitionsFunc = async () => {
  const issueKey = 'INC-1755'
  const transitions = await getTransitions(issueKey);
  console.log(transitions)
}

const getIssueByIDFunc = async (issueKey) => {
  const issue = await getIssueByID(issueKey);
  console.log(issue)
}

// This will list all users
const getUsersFunc = async () => {
  const users = await getUsers();
  console.log(users)
}

// Step 1, get user account ID to be able to assign a new project to a user
// Get users - needed to get the leadAccountID to be able to create a project!
getUsersFunc();

// Step 2, add the accountID to the env file, save the file and run source .env and then 
// uncomment the function call below to create a project, create an issue in that project,
// and mark that issue as in progress
// createProjectIssueAndUpdate();

// Step 3, uncomment the function call below to get issues to see the newly created issue
// getIssuesFunc();

// Step 4, uncomment the function call below to get issues to see the newly created project
// Get recent projects
// getRecentProjects();

// Optional -- uncomment the function call below to get an issue by ID
// getIssueByIDFunc('INC-1755')

// Optional -- uncomment the function call below to get transitions of a newly created project
// Get transitions - needed to see how to update the status of an issue
// getTransitionsFunc()




let filterIssueForm = document.getElementById('filter-issue-form');
let issuesJson = document.getElementById('issue-data').getAttribute('data');
let issues = JSON.parse(issuesJson);
let issueList = document.getElementById('issues-list');

filterIssueForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let filteredIssues = [];

  let labelsList = filterIssueForm.querySelectorAll('input[type=checkbox]');
  let labelsElements = [...labelsList].filter((Element) => Element.checked);

  let authorVal = filterIssueForm.querySelector(
    'input[type=radio][name=author]:checked'
  ).value;

  let [...labelsArr] = labelsElements.map((Element) => Element.value);

  issues.map((el) => {
    if (el.author == authorVal) {
      if (!filteredIssues.includes(el)) {
        filteredIssues.push(el);
      }
    }
    labelsArr.map((label) => {
      if (el.labels.includes(label)) {
        if (!filteredIssues.includes(el)) {
          filteredIssues.push(el);
        }
      }
    });
  });
  
  issueList.innerHTML = '';
  for (let issue of filteredIssues) {
    let Div = document.createElement('div');
    Div.style = 'none';
    Div.innerHTML = `
      <h1>Title : ${issue.title} </h1>
      <h3>Author : ${issue.author}</h3>
      <h4>
        Description : ${issue.description}
      </h4>
  `;
    issueList.appendChild(Div);
  }
});
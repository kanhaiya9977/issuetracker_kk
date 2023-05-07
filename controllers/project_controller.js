const Project = require('../models/project');
const Issue = require('../models/issues');


module.exports.create = async (req, res) => {
    try {
        let project =await Project.create({
            name : req.body.name,
            description : req.body.description,
            author : req.body.author
        });
        console.log('Created Project :', project)
        return res.redirect('/');
    } catch (error) {
        console.log('Error In creating Project try again !!', error)
        return res.redirect('back')
    }
}

module.exports.createIssue = async function (req, res) {
    try {
      let project = await Project.findById(req.params.id);
      if (project) {
        let issue = await Issue.create({
          title: req.body.title,
          description: req.body.description,
          labels: req.body.labels,
          author: req.body.author,
        });
        project.issues.push(issue);
  
        if (!(typeof req.body.labels === 'string')) {
          for (let label of req.body.labels) {
            let isPresent = project.labels.find((obj) => obj == label);
            if (!isPresent) {
              project.labels.push(label);
            }
          }
        } else {
          let isPresent = project.labels.find((obj) => obj == req.body.labels);
          if (!isPresent) {
            project.labels.push(req.body.labels);
          }
        }
        await project.save();
        return res.redirect(`back`);
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      return res.redirect('back');
    }
  };

  module.exports.createProject =  (req, res) => {
  
    return res.render('project_form', {
      title: 'Create | Project-Form',
    });
  };

  module.exports.project = async (req, res) => {
    try {
      let project = await Project.findById(req.params.id)
      .populate({
        path: 'issues',
      }).exec();

      if(project) {
        return res.render('project_page', {
          title: 'project | page',
          project : project
        })
      }

      return res.redirect('back');

    } catch (error) {
      console.log('Error', error);
      return;
    }
  }

  module.exports.issueForm = async (req, res) => {

    try{ 
      let project = await Project.findById(req.params.id);
   if(project) {
    return res.render('issue_form', {
      title: 'Issue | Form',
      project,
    })
   }    

   return res.redirect('/');

    } catch (error) {

      console.log('Error', error);

    }
  }

  module.exports.showProjectIssues = async (req, res) => {
    try {
      let project =await Project.findById(req.params.id)
      .populate({
        path: 'issues',
      }).exec();

      return res.render('project_issues',{
        title: 'Project | Issues',
        project
      })
    } catch (error) {
      console.log('Error', error);
    }
  }
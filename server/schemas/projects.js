const { gql } = require('apollo-server-express');

const { typeDef: Technology } = require('./technology');
const { projects } = require('./data-set');

// --- Schema ---

exports.typeDefs = [gql`
  extend type Query {
    projects: [Project]
  }
  
  type Project { 
    id: ID
    name: String
    startDate: String
    technologies: [Technology]
  }
  
 extend type Mutation {
   createProject(name: String, startDate: String): Project,
   deleteProject(id: ID): ID,
   deleteAllProjects: String
 }
`, Technology];

// --- Resolvers ---
const createProject = (root, project) => {
  const id = (+new Date()).toString();
  const newProject = { ...project, id, technologies: []};
  projects.push(newProject);

  return newProject;
};

const deleteProject = (root, { id }) => {
  const inx = projects.findIndex(project => project.id === id);

  if (inx !== -1) {
    projects.splice(inx, 1);
  }

  return id;
};

const deleteAllProjects = () => {
  projects.length = 0;

  return '';
};

exports.projectsResolvers = {
  Query: {
    projects: () => projects
  },
  Mutation: {
    createProject,
    deleteProject,
    deleteAllProjects
  }
};

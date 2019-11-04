const { gql } = require('apollo-server-express');

const { projects } = require('./data-set');

// --- Schema ---

module.exports.typeDefs = gql`
  type Project { 
    id: ID
    name: String
    startDate: String
    technologies: [Technology]
  }

  extend type Query {
    projects(search: String, limit: Int): [Project]
  }
  
  extend type Mutation {
    createProject(name: String, startDate: String): Project,
    deleteProject(id: ID): ID,
    deleteAllProjects: String
  }
`;

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

module.exports.projectsResolvers = {
  Query: {
    projects: (root, filters) => {
      console.log('Filters', filters);
      let filteredProjects = [...projects];
      if (!Object.keys(filters).length) {
        return projects;
      }

      const { search, limit } = filters;

      if (limit) {
        filteredProjects = projects.slice(0, limit);
      }

      if (search && search.length) {
        filteredProjects = filteredProjects.filter(project => project.name
          .toLowerCase()
          .includes(search.toLowerCase()));
      }

      return filteredProjects;
    }
  },
  Mutation: {
    createProject,
    deleteProject,
    deleteAllProjects
  }
};

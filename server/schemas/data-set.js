const projects = [{
  id: '1',
  name: 'TNG',
  startDate: '08.12.2019',
  technologies: [{
    name: 'Angular',
    version: '8.2.0'
  }, {
    name: 'Apollo',
    version: '1.8.2'
  }],
  company: 'Bridgewater',
  description: '\n' +
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Cupiditate fuga illum inventore itaque magni minus, nulla perferendis. Amet cumque dolorum obcaecati quibusdam ' +
    'voluptate! Accusamus blanditiis, corporis possimus ratione vero vitae!',
  members: [{
    fullName: 'Den Glubitzkiy',
    role: 'DEVELOPER'
  }, {
    fullName: 'Loren Flubitzkiy',
    role: 'PM'
  }]
}, {
  id: '2',
  name: 'DFAC',
  startDate: '08.12.2020',
  description: '\n' +
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Cupiditate fuga illum inventore itaque magni minus, nulla perferendis. Amet cumque dolorum obcaecati quibusdam ' +
    'voluptate! Accusamus blanditiis, corporis possimus ratione vero vitae!',
  technologies: [{
    name: 'Angular',
    version: '8.2.0'
  }, {
    name: 'NgRx',
    version: '8.0.0'
  }],
  company: 'Bridgewater'
}];

exports.projects = projects;

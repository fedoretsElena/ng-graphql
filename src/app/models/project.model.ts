import { IUser } from './user.model';

export interface IProject {
  id: string;
  name: string;
  startDate: string;
  technologies: ITechnology[];
}

export interface ITechnology {
  name: string;
  version: string;
}

export interface IProjectDetails extends IProject {
  description: string;
  members: IUser[];
  company: string;
}

import { api } from '../api/config';
import authHeader from './auth-header';


class ProjectService {

  getProject() {
    return api.get('v1', { headers: authHeader() });
  }

  listProjects() {
    return api.get('v1/projects', { headers: authHeader() });
  }

  createProject() {
    return api.get('v1/projects', { headers: authHeader() });
  }
}

export default new ProjectService();
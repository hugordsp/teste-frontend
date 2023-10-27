import { api } from '../api/config';
import authHeader from './auth-header';


class ProjectService {

  listProjects(page) {
    let path = 'v1/projects';
    if (page) { path = path + `?page=${page}` };
    return api.get(path, { headers: authHeader() });
  }

  createProject({
    name,
    startDate,
    endDate,
    value,
    status
  }) {
    return api.post('v1/projects',{
      name,
      start_date: startDate,
      end_date: endDate,
      value,
      status
    }, { headers: authHeader() });
  }

  editProject({
    id,
    name,
    startDate,
    endDate,
    value,
    status
  }) {
    return api.put('v1/projects/' + id,{
      name,
      start_date: startDate,
      end_date: endDate,
      value,
      status
    }, { headers: authHeader() });
  }

  deleteProject({
    id
  }) {
    return api.delete('v1/projects/' + id, { headers: authHeader() });
  }

  
}

export default new ProjectService();
import { api } from '../api/config';

class AuthService {
  login(user) {
    return api
      .post('login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return api.post('register', {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
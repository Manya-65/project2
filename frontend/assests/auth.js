// Backend API URL
const baseURL = 'http://localhost:5000/api/users';

document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      const res = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "login.html";
      } else {
        alert("Registration failed.");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        window.location.href = payload.role === "employer" ? "dashboard-employer.html" : "dashboard-seeker.html";
      } else {
        alert("Login failed.");
      }
    });
  }
});

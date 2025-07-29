const tokenEmp = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const jobForm = document.getElementById('jobForm');

  if (jobForm) {
    jobForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const job = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        requirements: document.getElementById('requirements').value,
        location: document.getElementById('location').value,
        deadline: document.getElementById('deadline').value
      };

      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenEmp
        },
        body: JSON.stringify(job)
      });

      if (res.ok) {
        alert('Job posted!');
        window.location.href = 'dashboard-employer.html';
      } else {
        alert('Failed to post.');
      }
    });
  }
});

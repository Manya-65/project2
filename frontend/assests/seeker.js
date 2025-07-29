const API = 'http://localhost:5000/api/jobs';
const token = localStorage.getItem('token');

fetch(API, {
  headers: {
    'Authorization': token
  }
})
.then(res => res.json())
.then(data => {
  const jobList = document.getElementById('jobsList');
  data.forEach(job => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <p>${job.location}</p>
      <button onclick="applyJob('${job._id}')">Apply</button>
    `;
    jobList.appendChild(div);
  });
});

function applyJob(jobId) {
  fetch(`${API}/${jobId}/apply`, {
    method: 'POST',
    headers: {
      'Authorization': token
    }
  })
  .then(res => {
    if (res.ok) alert('Applied!');
    else alert('Already applied or error.');
  });
}

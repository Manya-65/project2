const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Job Portal API running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

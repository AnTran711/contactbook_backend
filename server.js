import app from './app.js';
import config from './app/config/index.js';

// Start server
const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

import app from './app.js';
import config from './app/config/index.js';
import MongoDB from './app/utils/mongodb.util.js';

async function startServer() {
  try {
    // Connect database
    await MongoDB.connect(config.db.uri);
    console.log('Connected to the database!');
    
    // Start server
    const PORT = config.app.port;
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch(err) {
    console.log('Cannot connect to database!', err);
    process.exit();
  }
}

startServer();

const cors = require("cors");

const corsOptions = {
  // origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

module.exports = function(app) 
{ app.use(cors(corsOptions))
}



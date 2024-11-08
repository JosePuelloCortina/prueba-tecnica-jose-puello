const axios = require('axios');

async function getTokenJWT() {
  const url = 'https://analyticsdev.app.marval.com.co/api/jwtjde/loginjwt';
  const credentials = {
    login: 'prueba',
    pswd: '4d89b2a6498c0f4170ef9aa1de125a27.1dd564de6063cf1e0ec171ad7d030595730b0704a17fae8b066e44f67633ea876e8dfda41176672341b4f42aa044e4a2'
  };

  try {
    const response = await axios.post(url, credentials, {
      headers: { 'Content-Type': 'application/json' }
    });    
    const token = response.data.accessToken; 
    return token;
  } catch (error) {
    console.error('Error obtaining JWT token:', error);
    throw error;
  }
}

async function getProjects(token) {
  const url = 'https://analyticsdev.app.marval.com.co/api/jwtjde/getAllProyectos';

  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data; 
  } catch (error) {
    console.error('Error when obtaining projects:', error);
    throw error;
  }
}

module.exports = { getTokenJWT, getProjects };

const axios = require('axios');
const dotenv = require('dotenv').config();

const {
    login, pswd,
} = process.env;

async function getTokenJWT() {
  const url = 'https://analyticsdev.app.marval.com.co/api/jwtjde/loginjwt';
  const credentials = {
    login,
    pswd
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

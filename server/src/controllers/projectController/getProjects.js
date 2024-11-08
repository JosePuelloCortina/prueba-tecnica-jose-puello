const authService = require('../../utils/authService');

const getProjects = async (req, res) => {
  try {
    const projects = await authService.getProjects(req.token);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error when obtaining projects', error: error.message });
  }
};

module.exports = getProjects ;
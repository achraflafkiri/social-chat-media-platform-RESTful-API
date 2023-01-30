function checkAuth(req, res, next) {
  // Check if the user is logged in

  if(!req.rawHeaders[1].startsWith("Bearer")) return res.status(401).json({
      status: "error",
      message: "Unauthorized - Please log in to continue.",
    });

  // If the user is logged in, call the next middleware function
  next();
}

function checkAdmin(req, res, next) {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: "error",
      message: "Forbidden - Only admins are allowed to access this route.",
    });
  }

  // If the user is an admin, call the next middleware function
  next();
}

module.exports = { checkAuth, checkAdmin };

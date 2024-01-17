const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        return next();
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    };
  };

export const isAdmin = checkRole('admin');
export const isAlumni = checkRole('alumni');
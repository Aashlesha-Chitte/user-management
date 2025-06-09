import { signToken } from '../../libs/utils.js';
import User from '../../models/user.js';
import bcrypt from 'bcryptjs';

class GenerateToken {
  static getInstance() {
    if (!GenerateToken.instance) {
      GenerateToken.instance = new GenerateToken();
    }
    return GenerateToken.instance;
  }

  generateToken = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('role_id').lean();
    if (!user) {
      return res.json({ message: 'Invalid email', status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Invalid password', status: 401  });
    }
    const roleName = user.role_id?.name
    const token = signToken({ id: user.id, email: user.email, role: roleName });

    res.json({ token: `Bearer ${token}` });
  }
}

export default GenerateToken.getInstance();

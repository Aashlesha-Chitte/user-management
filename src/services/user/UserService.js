import User from '../../models/user.js';
import Role from '../../models/role.js';
import bcrypt from 'bcryptjs';

class UserService {

    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async createUser(req, res) {
        try {
            const { firstName, lastName, email, phone, password } = req.body;
            if (!email || !firstName || !lastName || !password) {
                return res.json({ message: 'All fields are required!', status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const defaultRole = await Role.findOne({ name: 'user' });
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                phone,
                password: hashedPassword,
                role_id: defaultRole?._id,
            });

            return res.send({ message: 'Success', status: 200, data: newUser });
        } catch (e) {
            console.log(`UserService :: createUser :: Error`, JSON.stringify(e));
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find({ isDeleted: false });
            return res.send({ message: 'Success', status: 200, data: { list: users, totalCount: users.length } });
        } catch (e) {
            console.log(`UserService :: getUsers :: Error`, JSON.stringify(e));
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id, isDeleted: false });

            if (!user) {
                return res.json({ message: 'User not found', status: 404 });
            }

            return res.send({ status: 200, data: user, status: 200 });
        } catch (e) {
            console.log(`UserService :: getUserById :: Error`, JSON.stringify(e));
            return res.json({ message: 'Internal Server Error', status: 500 });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            if (!req.body) {
                return res.json({ message: "Invalid Body", status: 400 });
            }

            const { firstName, lastName, email, phone } = req.body;

            if (!firstName && !lastName && !email && !phone) {
                return res.json({ message: "At least one field must be provided to update the user.", status: 400 });
            }

            const user = await User.findOne({ _id: id, isDeleted: false });

            if (!user) {
                return res.json({ message: 'User not found', status: 404 });
            }

            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

            return res.json({
                message: 'User updated successfully',
                status: 200,
                data: updatedUser
            });
        } catch (e) {
            console.log(`UserService :: updateUser :: Error`, JSON.stringify(e));
            return res.json({ message: 'Internal Server Error', status: 500 });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id, isDeleted: false });

            if (!user) {
                return res.json({ message: 'User not found', status: 404 });
            }

            const result = await User.updateOne(
                { _id: id },
                {
                    $set: {
                        deletedAt: new Date(),
                        deletedBy: user._id.toString(),
                        isDeleted: true,
                    },
                }
            );
            return res.json({ message: 'User deleted successfully', status: 200 });
        } catch (e) {
            console.log(`UserService :: deleteUser :: Error`, JSON.stringify(e));
            return res.json({ message: 'Internal Server Error', status: 500 });
        }
    }

    async assignRole(req, res) {
        try {
            const userId = req.params.id;
            const { roleName } = req.body;

            const role = await Role.findOne({ name: roleName });
            if (!role) return res.json({ message: 'Role not found', status: 404 });

            const user = await User.findByIdAndUpdate(userId, { role_id: role._id }, { new: true }).populate('role_id');
            if (!user) return res.json({ message: 'User not found', status: 404 });

            res.json({ message: 'Role assigned', user });
        } catch (err) {
            res.json({ message: 'Failed to assign role', error: err.message, status: 500 });
        }
    };

    async filterUsers(req, res) {
        try {
            const {
                search,
                firstName,
                lastName,
                email,
                phone,
                role,
                limit = 10,
                skip = 0,
                sortField = 'createdAt',
                sortOrder = -1,
            } = req.query;

            const andFilters = [{ isDeleted: false }];

            if (search) {
                const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escaped, 'i');

                andFilters.push({
                    $or: [
                        { firstName: { $regex: regex } },
                        { lastName: { $regex: regex } },
                        { email: { $regex: regex } },
                        { phone: { $regex: regex } },
                    ],
                });
            }

            if (firstName) andFilters.push({ firstName: new RegExp(firstName.trim(), 'i') });
            if (lastName) andFilters.push({ lastName: new RegExp(lastName.trim(), 'i') });
            if (email) andFilters.push({ email: new RegExp(email.trim(), 'i') });
            if (phone) andFilters.push({ phone: new RegExp(phone.trim(), 'i') });

            if (role) {
                const roleDoc = await Role.findOne({ name: role });
                if (roleDoc) {
                    andFilters.push({ role_id: roleDoc._id });
                }
            }

            const query = andFilters.length > 0 ? { $and: andFilters } : {};

            const users = await User.find(query)
                .populate('role_id')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .sort({ [sortField]: parseInt(sortOrder) });

            const count = await User.countDocuments(query);

            res.json({ message: 'Success', Status: 200, data: { list: users, totalCount: count } });
        } catch (err) {
            res.json({ message: 'Failed to fetch users', error: err.message, status: 500 });
        }
    };

}

export default UserService.getInstance();

import User from '../models/user.js';
import Role from '../models/role.js';
import bcrypt from 'bcryptjs';

const seedData = async () => {
    try {
        console.log('Checking and seeding default admin...');

        let adminRole = await Role.findOne({ name: 'admin' });
        if (!adminRole) {
            adminRole = await Role.create({
                name: 'admin',
                description: 'Administrator with full access',
                permissions: ['create', 'read', 'update', 'delete']
            });
            console.log('Admin role created successfully');
        }

        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                firstName: 'System',
                lastName: 'Administrator',
                email: 'admin@example.com',
                phone: '+1234567890',
                password: hashedPassword,
                role_id: adminRole._id,
            });

            console.log('Admin user seeded successfully');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (err) {
        console.error('Error occured seeding admin data:', err);
    }
};

export default seedData;

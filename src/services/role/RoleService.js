import Role from '../../models/role.js';

class RoleService {

    static getInstance() {
        if (!RoleService.instance) {
            RoleService.instance = new RoleService();
        }
        return RoleService.instance;
    }

    async createRole(req, res) {
        try {
            const { name, description, permissions } = req.body;
            const existing = await Role.findOne({ name });
            if (existing) {
                return res.json({ message: 'Role already exists', status: 400 });
            }

            const role = await Role.create({ name, description, permissions });
            res.json({ message: 'Role created', status: 200, role });
        } catch (err) {
            res.json({ message: 'Error creating role', status: 500, error: err.message });
        }
    };


}

export default RoleService.getInstance();

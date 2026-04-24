const Role=require("../models/User")
const Service=require("../models/Service")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User = require("../models/User");
//Register
exports.register = async (req, res) => {
    try {
        const{fullname,email,password,role}=req.body
                const userExists=await Role.findOne({email})
                if (userExists){
                    return res.json({message:"user already exists"})
                }
                const hashpassword=await bcrypt.hash(password,10)
                const user=await Role.create({
                    fullname,
                    email,
                    password:hashpassword,
                    role
                })
                res.json({message:"user registered successfully",user})
            }
    catch (error) {
        res.json({ error: error.message })
    }
}

//Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 2. This is where it was crashing because 'User' was undefined
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // 3. Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Send Success Response
        res.status(200).json({
            token,
            users: {
                fullname: user.fullname,
                role: user.role
            }
        });

    } catch (error) {
        console.error("🔥 Detailed Server Error:", error.message);
        res.status(500).json({ error: "Server error during login" });
    }
};
//Logout(client side token remove)
exports.logout=(req,res)=>{
    req.session.destroy(()=>{
    res.clearCookie("connect.sid")
    res.json({message:"Logout successful"})
    })
}

// Get Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await Role.countDocuments();
        const totalAdmins = await Role.countDocuments({ role: 'admin' });
        const totalRegularUsers = await Role.countDocuments({ role: 'user' });
        const recentUsers = await Role.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            totalAdmins,
            totalRegularUsers,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Role.find().sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Service Management Methods

// Add Service
exports.addService = async (req, res) => {
    try {
        const { title, description, image, price, duration } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: "Service title is required" });
        }

        const newService = await Service.create({
            title,
            description: description || '',
            image: image || '/images/default-service.jpg',
            price: price || 0,
            duration: duration || '1 hour'
        });

        res.json({ message: "Service added successfully", service: newService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json({ services });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price, duration, status } = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { title, description, image, price, duration, status },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Service
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

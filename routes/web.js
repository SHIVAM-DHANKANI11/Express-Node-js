const express=require("express")
const router=express.Router()
const{about,services,team,clients}=require("../public/data")
//const app=express()

// app.set('view engine','ejs')
// app.use(express.static("public"))

router.get('/',(req,res)=>{

    res.render('index',{about,services,team,clients})
})
router.get('/about',(req,res)=>{
  
    res.render('about')
})
router.get('/service',(req,res)=>{
  
    res.render('service')
})
router.get('/contact',(req,res)=>{


    res.render('contact')
})


const userController=require("../controller/userController")
const {checkAdminRole} = require("../middleware/checkrole")

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/logout",userController.logout)

// Admin dashboard routes
router.get("/admin/dashboard", (req, res) => {
    res.render("admin-dashboard")
})
router.get("/admin/login", (req, res) => {
    res.render("admin-login")
})

// Dashboard API endpoints
router.get("/dashboard-stats", checkAdminRole, userController.getDashboardStats)
router.get("/all-users", checkAdminRole, userController.getAllUsers)

// Service Management endpoints
router.post("/services", checkAdminRole, userController.addService)
router.get("/services", checkAdminRole, userController.getAllServices)
router.put("/services/:id", checkAdminRole, userController.updateService)
router.delete("/services/:id", checkAdminRole, userController.deleteService)


module.exports=router
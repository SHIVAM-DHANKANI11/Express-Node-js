const bcrypt = require("bcryptjs")
const User = require("../models/User")

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminFullname = process.env.ADMIN_FULLNAME || "System Admin"

  if (!adminEmail || !adminPassword) {
    console.warn("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env")
    return
  }

  const existingAdmin = await User.findOne({ email: adminEmail })

  if (existingAdmin) {
    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin"
      await existingAdmin.save()
      console.log("Existing user upgraded to admin role")
    }
    return
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await User.create({
    fullname: adminFullname,
    email: adminEmail,
    password: hashedPassword,
    role: "admin"
  })

  console.log("Default admin user created")
}

module.exports = seedAdmin

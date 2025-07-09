# 🎓 EduManage – Student Admission & Class Management System

EduManage is a full-featured student admission and class management system built with [Next.js](https://nextjs.org), MongoDB, Cloudinary, and JWT. It supports role-based access (Admin, Teacher, Student), document uploads, and dynamic class assignment.

---

## ⚙️ Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Husnain0120/school_management_sys.git
cd edumanage
2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file using the provided .env.sample file:

cp .env.sample .env
Update .env with your actual credentials:


MONGODB_URI=your_mongodb_connection_string
CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECERT=your_cloudinary_api_secret
JWT_KEY=your_jwt_secret
⚠️ Important: Never commit .env files to GitHub. Keep your secrets safe.

🚀 Running the Project Locally

npm run dev
Now open your browser and visit:
👉 http://localhost:3000

🌱 Manually Seed Database
Step 1: Create admissionforms collection in MongoDB
Step 2: Insert the following sample users
👨‍🎓 Admin User

{
  "fullName": "Muhammad Husnain Rashid",
  "fatherName": "Rashid",
  "email": "abc@gmail.com",
  "gender": "male",
  "dateOfBirth": "2002-04-02T00:00:00.000Z",
  "currentAddress": "District Rawalpindi",
  "permanentAddress": "District Rawalpindi ",
  "city": "KAHUTA",
  "zipCode": "47330",
  "studentPhoto": "https://res.cloudinary.com",
  "idProof": "https://res.cloudinary.com",
  "birthCertificate": "https://res.cloudinary.com/",
  "admissionClass": "Business Basics & Information Technology (BB&IT)",
  "role": "admin",
  "isVerified": true,
  "portalId": "edu255476000",
  "password": "$2b$10$32.EHbGtbRzo89vS74KmzOaDAJ8qXNvXFDXghVtodXwPlJh6SlV72",
  "userAccess": true,
  "class": null
}
👨‍🏫 Teacher User

{
  "fullName": "Hamza",
  "fatherName": "Ali",
  "email": "hamze_ali@gmail.com",
  "gender": "male",
  "dateOfBirth": "2003-04-05T00:00:00.000Z",
  "currentAddress": "District Rawalpindi ",
  "permanentAddress": "District Rawalpindi ",
  "city": "KAHUTA",
  "zipCode": "47330",
  "studentPhoto": "https://res.cloudinary.com/",
  "idProof": "https://res.cloudinary.com/",
  "birthCertificate": "https://res.cloudinary.com/",
  "admissionClass": "Business Basics & Information Technology (BB&IT)",
  "subjects": [

  ],
  "role": "teacher",
  "isVerified": true,
  "portalId": "edu251939000",
  "password": "$2b$10$Z.DbNRdBPAVgDrGXIEJ/IuhHxY1O6pyOHlDAlbP2bRNcFdkTTTQtu",
  "userAccess": true,
  "class": { "$oid": "682b2940f9a722295aa86349" }
}
🔑 Admin Login Credentials
Use the following credentials to log in as admin:

Portal ID: edu255476728

Password01: 123456789
          OR
Password02: edu@123

After login:

Go to the Classes section.

Create new classes.

Assign a teacher to the class.

🧠 Features
Role-based login: Admin, Teacher, Student

Dynamic class creation & assignment

Secure login with JWT

Image/document upload via Cloudinary

MongoDB database management

Fully responsive UI (Tailwind + ShadCN)

📤 How to Contribute
Fork this repository

Clone your fork

Create a branch

Commit your changes

Push and submit a Pull Request


git clone https://github.com/your-username/edumanage.git
git checkout -b feature/your-feature-name
git commit -m "Add your message"
git push origin feature/your-feature-name
✅ Best pull requests will be reviewed and merged. Your contributions are welcome!

💬 Need Help?
I understand setup may feel difficult at first. If you need help, feel free to contact me:
🔗 Muhammad Husnain Rashid on LinkedIn

Let’s grow this open-source project together! 💻

📘 Learn More About Next.js
Next.js Documentation

Interactive Tutorial

Next.js GitHub

📡 Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform.
Check deployment docs for details.

📝 License
This project is licensed under the MIT License.



Would you like me to also generate the actual `.env.sample` content too? Let me know and I’ll send it next.

```

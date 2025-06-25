# 📰 FeedForge

**FeedForge** is a modern full-stack newsletter-style application where users can explore trending posts, add their own content, and manage liked or saved posts with ease.

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Next.js, Redux, Tailwind CSS, Framer Motion  
- **Backend**: Next.js API Routes, MongoDB  
- **Authentication**: NextAuth.js  

---

## ✨ Features

- 🔍 View curated posts and user-generated content  
- 📝 Add new posts  
- ❤️ Like posts and view your liked collection  
- 📌 Save posts for later  
- 🔐 Secure authentication with NextAuth  
- ⚡ Beautiful animations using Framer Motion  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/feedforge.git
cd feedforge

###2. Create Environment Variables

Create a file in the root directory called .env.local and paste this:

MONGO_URI=mongodb+srv://your_user:your_password@cluster0.mongodb.net/feedforge?retryWrites=true&w=majority&appName=Cluster0
NEXTAUTH_SECRET=your_generated_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

Replace:

-your_user and your_password with your MongoDB Atlas credentials

-feedforge is the name of your database

To generate a secure secret:

openssl rand -base64 32

### 3. Set Up MongoDB Atlas Access
Go to MongoDB Atlas

Open your cluster

Go to Network Access → Add IP Address

Add your current IP or use 0.0.0.0/0 (for development)

Wait ~30 seconds for the rule to apply

### 4. Start the Development Server

npm run dev

Now open http://localhost:3000 in your browser to use the app.

### ✨ Features
🔍 Browse and view curated or user-generated posts

📝 Add new posts

❤️ Like and revisit your liked collection

📌 Save posts for later

🔐 Secure authentication with NextAuth

⚡ Beautiful animations using Framer Motion

### 📂 Folder Structure

/pages              → Next.js pages & API routes  
/components         → Reusable UI components  
/lib                → DB and utility logic  
/Redux              → Redux slices and store setup  
/public             → Static assets  
/styles             → Tailwind + global styles




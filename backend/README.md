# x.ai Backend API

This is the backend API for the x.ai clone project. It provides authentication and user management functionality.

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file based on `.env.example` and fill in your MongoDB connection string and JWT secret
4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Users (Admin only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

- `NODE_ENV` - Environment (development, production)
- `PORT` - Server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

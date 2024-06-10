# AppoSwift

## Description

AppoSwift is a feature-rich Food Ordering App that offers comprehensive search, sort, filter, and pagination options. Users can effortlessly manage restaurants, upload images, handle shopping carts with Stripe integration for secure checkout, and enjoy real-time order tracking status.

## Features

- Comprehensive search, sort, filter, and pagination options
- Restaurant management
- Image upload functionality
- Shopping cart with Stripe integration for secure checkout
- Real-time order tracking

## Tech Stack

AppoSwift is built using the following technologies:

- **Frontend:**

  - React
  - TypeScript
  - Tailwind CSS
  - React Form
  - ShadCN
  - React Query

- **Backend:**

  - Node.js
  - Express

- **Database:**

  - MongoDB
  - Mongoose

- **Authentication:**

  - Auth0

- **File Storage:**

  - Cloudinary

- **Payment Processing:**
  - Stripe

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/JoshuaOzorji/apposwift.git
cd apposwift
Install the dependencies:
sh
Copy code
npm install
# or
yarn install
Set up environment variables:
Create a .env file in the root directory and add the following variables:

env
Copy code
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-public-key
REACT_APP_API_BASE_URL=your-api-base-url
MONGO_URI=your-mongodb-uri
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
Running the App
Start the frontend:
sh
Copy code
npm start
# or
yarn start
Start the backend:
sh
Copy code
cd backend
npm start
# or
yarn start
The app should now be running on http://localhost:3000.

Contributing
Contributions are welcome! Please read our Contributing Guide to learn how to get involved.



```

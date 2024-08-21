# References 

- I have used the use of Ai at some point of my project. 
- Used the fake store API and login Function. 
- Viarity of other shopping applicationg for imspiration in terms of styling. 

# Product Catalog and Shopping Application

Welcome to the Product Catalog and Shopping Application! This Vue.js-based project features a robust shopping experience, including product browsing, detailed views, cart management, and wishlist functionalities. Below is an overview of the project requirements, features, and technologies used.

## Deployed URL

The project is deployed and can be accessed via the custom Vercel URL: [Your Vercel URL](https://your-custom-vercel-url.vercel.app/).

## Features

### General Features

- **Custom Favicon**: A custom icon is displayed in the browser tab. Favicon details were created and added via [Real Favicon Generator](https://realfavicongenerator.net/).
- **Meta Tags**: Meta tag information was generated and added via [Meta Tags](https://metatags.io/), ensuring proper SEO and social media sharing.

### Product Browsing

- **Grid Layout**: Products are displayed in a responsive grid format.
- **Product Details**: Each product card shows the following:
  - Product image
  - Title
  - Price
  - Category
- **Navigation**: Users can navigate to a detailed view of a product by clicking on the "Details" button.

### Product Detailed View

- **Product Details Page**: Shows comprehensive information about the product, including:
  - Title
  - Description
  - Image
  - Price
  - Category
  - Rating and number of reviews
- **Navigation Back**: Users can return to the product grid/list page from the detailed view.

### Data Handling

- **API Integration**: All shop data is fetched via API calls, ensuring no hardcoded data in the application.
- **Loading States**: Displays a loading state while fetching data initially or during new data loading.

### Filtering and Sorting

- **Category Filter**: Products can be filtered by category (categories fetched from the API).
- **Price Sorting**: Products can be sorted by lowest and highest prices.
- **Reset Filters**: Users can reset filters and sorting without refreshing the app.
- **Persist Filters**: Applied filters and sorting persist after navigating to a detailed view and returning to the home page.

### User Authentication

- **Login Functionality**: Users can log in using the [Fake Store API](https://fakestoreapi.com/auth/login) endpoint.
  - **Password Management**: Passwords are hidden by default with an option to toggle visibility.
  - **Empty Fields**: The login page prevents submission of empty username or password.
  - **Server Notifications**: Users are notified during authentication and on login failure.
  - **Redirect After Login**: Users are redirected to their previously accessed page after successful login.
  - **JWT Management**: User JWT is stored in local storage for persistent authentication and cleared upon logout.

### Cart Management

- **Add to Cart**: Logged-in users can add products to their shopping cart.
- **Cart Persistence**: Cart data is persistent in local storage and protected to be accessible only to logged-in users.
- **Cart Management**: Users can:
  - View all products in their cart
  - Update quantities
  - Remove items
  - Clear the entire cart
  - See the number of items and total cost (rounded to two decimal points)
  - Manage multiple additions of cart items

### Comparison Feature

- **Comparison List**: Logged-in users can add products to a comparison list.
- **Comparison Page**: Features a table format for side-by-side comparison of product specifications, including:
  - Titles
  - Images
  - Descriptions
  - Prices
  - Ratings
- **Manage Comparison List**: Users can:
  - Remove items
  - Clear the entire comparison list
  - Ensure the list does not get too wide by limiting the number of items

## Technologies Used

- **Vue.js**: The core framework for building the user interface and handling the application logic.
- **Vercel**: Deployment platform used for hosting the project.
- **Real Favicon Generator**: Tool used for creating and adding favicon.
- **Meta Tags**: Tool used for generating meta tag information.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run serve
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**:
   Follow the [Vercel Deployment Guide](https://vercel.com/docs/concepts/deployments) to deploy your built application.

Thank you for using the Product Catalog and Shopping Application! Enjoy your shopping experience.
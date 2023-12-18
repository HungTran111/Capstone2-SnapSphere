# Instagram Clone

## Overview

This project is a React-based Instagram clone that allows users to sign up, log in, upload images, and view posts with comments.

## Technologies Used

- React
- Firebase (Firestore, Authentication, Storage)
- Material-UI
- CSS

## Features

1. **Authentication:**
   - Users can sign up and log in securely using Firebase Authentication.
   - Logout functionality is available.

2. **Posts:**
   - Posts are displayed with usernames, captions, and images.
   - Posts are editable.
   - Posts are sorted by timestamp in descending order.

3. **Image Upload:**
   - Users can upload images along with captions.
   - Image uploads are stored in Firebase Storage.
   - Progress bar indicates upload status.

4. **Comments:**
   - Users can add comments to posts.
   - Comments are editable.
   - Comments are displayed with usernames and timestamps.

5. **Likes:**
   - Users can like posts.
   - Users can unlike posts.
   - Likes are tracked with visible number.

## Project Structure

- **App.js:** Main component handling overall app structure.
- **firebase.js:** Firebase configuration and initialization.
- **ImageUpload.js:** Component for image uploads.
- **Post.js:** Component rendering individual posts.
- **CSS files:** Styles for different components.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up Firebase project and update `firebaseConfig` in `firebase.js` with your credentials.
4. Run the app using `npm start`.

## Additional Notes

- **Modal Component:** Uses Material-UI's `Modal` for sign-up and sign-in forms.
- **Avatar Component:** Material-UI's `Avatar` is used for user avatars.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### STEP 2

1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.

   - Im using React and firebase

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?

   - Fullstack.

3. Will this be a website? A mobile app? Something else?
    - This will be a website

4. What goal will your project be designed to achieve?
    - This is a instagram clone. User views users posts and comments. However you have to go through authorization step go be able to comment

5. What kind of users will visit your app? In other words, what is the demographic of your users?
    - It will be a diverse of people. People of all ages snapping pictures and sharing moments.

6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.
   - Im planning to use React and firebase to store datas storing users and posts.

7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). Answer
questions like the ones below, but feel free to add more information:
    a. What does your database schema look like?
    - Using either node or firebase to store data and execute with React

    b. What kinds of issues might you run into with your API? This is especially
    important if you are creating your own API, web scraping produces
    notoriously messy data.
    - Most likely no because im not using any API source.

    c. Is there any sensitive information you need to secure?
    - Yes, it would be users password.

    d. What functionality will your app include?
    -App will futures posts and comments that users can view and post.

    e. What will the user flow look like?
    -Sign up -> sign in -> create post -> create comments -> view posts and commnets

    f. What features make your site more than a CRUD app? What are your
    stretch goals?
    - My stretch goals would be adding likes and chat

# Push the backend to heroku, cd into the client and then deploy the client
git subtree --prefix server push heroku master
cd client
npm run deploy

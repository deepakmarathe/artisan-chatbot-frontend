PORT=3000
lsof -i :$PORT -t | xargs kill -9
npm start
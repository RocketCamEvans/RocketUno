#!/bin/bash

[ ! -d "node_modules" ] && npm install

# Open browser
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open http://localhost:3000
elif [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:3000
fi

[ "$1" = "dev" ] && npm run dev || npm start

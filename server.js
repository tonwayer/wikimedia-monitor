const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

wss.on('connection', ws => {
  console.log('Client connected');

  const source = axios.CancelToken.source();
  const eventSource = axios.get('https://stream.wikimedia.org/v2/stream/recentchange', {
    headers: { 'Accept': 'application/json' },
    responseType: 'stream',
    cancelToken: source.token,
  });

  eventSource.then(response => {
    response.data.on('data', chunk => {
      try {
        const data = chunk.toString().split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
        console.log(data);
        data.forEach(event => ws.send(JSON.stringify(event)));
      } catch (SyntaxError) {
        console.log(SyntaxError)
      } 
    });
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      console.error('Error fetching stream:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    source.cancel('Client disconnected');
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

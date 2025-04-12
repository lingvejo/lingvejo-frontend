import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 4000;

const HASURA_URL = process.env.HASURA_GRAPHQL_URL;
const HASURA_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

app.use(cors());
app.use(express.json());

app.post('/graphql', async (req, res) => {
  const response = await fetch(HASURA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': HASURA_SECRET,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

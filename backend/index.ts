import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {User} from './user';

const app = express();
const PORT = 5100;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from the JSON file
const readUsersFromFile = (): any[] => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users: any[]): void => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing to users file:', error);
  }
};


app.post('/api/signup', (req: Request<{}, {}, User>, res: Response) => {
    const { name, email, password } = req.body;
    const users = readUsersFromFile();
    const existingUser = users.find((user: User) => user.email === email);

    if (existingUser) {
        res.status(400).send({ message: 'Email already in use' });
        return; // Return void instead of Response object
    }

    const newUser: User = { name, email, password };
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).send({ message: 'User created', name, email });
});

app.post('/api/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find((user: any) => user.email === email && user.password === password);

  if (user) {
    res.status(200).send({ message: 'User logged in', email });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
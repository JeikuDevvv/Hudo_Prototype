/* eslint-disable no-unused-vars */
import express from 'express';
import { createRequire } from 'module';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

const require = createRequire(import.meta.url);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Parse JSON requests

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = path.join(__dirname, 'DataUploadsFolder', req.body.title);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('attachment'), (req, res) => {
  try {
    const { title, sender, receiver, date, description } = req.body;
    const filePath = req.file.path;

    const data = {
      title,
      sender,
      receiver,
      date,
      description,
      attachment: filePath,
    };

    const dataFilePath = path.join(__dirname, 'DataUploadsFolder', title, `${Date.now()}.json`);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    console.log('Uploaded Data:');
    console.log('Title:', title);
    console.log('Sender:', sender);
    console.log('Receiver:', receiver);
    console.log('Date:', date);
    console.log('Description:', description);
    console.log('File Path:', filePath);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling the request:', error);

    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.delete('/api/files/:title', (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, 'DataUploadsFolder', title);
  
  try {
    fs.unlinkSync(filePath); // Delete the file
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Define a route to download files by title
app.get('/api/download/:title', (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, 'DataUploadsFolder', title);

  res.download(filePath, title); // Send the file as a download
});

// Serve files from the DataUploadsFolder
app.use('/api/files', express.static(path.join(__dirname, 'DataUploadsFolder')));

// Define an endpoint to fetch the list of files
app.get('/api/fileList', (req, res) => {
  try {
    const fileList = fetchFileList(path.join(__dirname, 'DataUploadsFolder'));
    res.json(fileList);
  } catch (error) {
    console.error('Error fetching file list:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Function to fetch the list of files in a directory
function fetchFileList(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  return files;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'DataUploadsFolder')));

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
    const { title, number_code, sender, receiver, date, description } = req.body;
    const filePath = req.file.path;

    const data = {
      title,
      number_code,
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
    console.log('Number Code:', number_code);
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

app.get('/api/folderList', (req, res) => {
  try {
    const folderList = fetchFolderList(path.join(__dirname, 'DataUploadsFolder'));
    res.json(folderList);
  } catch (error) {
    console.error('Error fetching folder list:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/api/data/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  const decodedFolderName = decodeURIComponent(folderName); // Decode the folder name

  const jsonFilePath = path.join(__dirname, 'DataUploadsFolder', decodedFolderName, `${decodedFolderName}.json`);

  console.log('Received folder name:', decodedFolderName);
  console.log('JSON File Path:', jsonFilePath);

  if (!fs.existsSync(jsonFilePath)) {
    res.status(404).json({ error: 'File Not Found', message: 'JSON file does not exist.' });
    return;
  }

  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function fetchFolderList(directoryPath) {
  const folders = fs.readdirSync(directoryPath);
  return folders;
}

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder with the title as the folder name
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
    const { title, sender, receiver } = req.body;
    const filePath = req.file.path;

    const data = {
      title,
      sender,
      receiver,
      attachment: filePath,
    };

    const dataFilePath = path.join(__dirname, 'DataUploadsFolder', title, `${Date.now()}.json`);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    console.log('Uploaded Data:');
    console.log('Title:', title);
    console.log('Sender:', sender);
    console.log('Receiver:', receiver);
    console.log('File Path:', filePath);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling the request:', error);

    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

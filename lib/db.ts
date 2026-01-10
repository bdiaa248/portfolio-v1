
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join((process as any).cwd(), 'data');
const DB_FILE = path.join(DB_PATH, 'portfolio.json');

// Initial State
const defaultData = {
  security: {
    password: "30514", // Default as requested
    lastLogin: null
  },
  projects: [],
  certificates: []
};

// Ensure DB exists
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
  }
}

export async function readDB() {
  initDB();
  const fileParams = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(fileParams);
}

export async function writeDB(data: any) {
  initDB();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  return true;
}

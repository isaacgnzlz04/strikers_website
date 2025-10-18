// IndexedDB utilities for Strikers Standings

let db = null;

// Initialize IndexedDB
export function initDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open('StrikersStandingsDB', 2);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      
      // Create object store for PDFs
      if (!database.objectStoreNames.contains('pdfs')) {
        const pdfStore = database.createObjectStore('pdfs', { keyPath: 'id' });
        pdfStore.createIndex('league', 'league', { unique: false });
      }
      
      // Create object store for weeks metadata
      if (!database.objectStoreNames.contains('weeks')) {
        database.createObjectStore('weeks', { keyPath: 'league' });
      }
      
      // Create object store for league configurations
      if (!database.objectStoreNames.contains('leagues')) {
        database.createObjectStore('leagues', { keyPath: 'name' });
      }
    };
  });
}

// Get all weeks for a league
export async function getWeeksForLeague(league) {
  await initDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(['weeks'], 'readonly');
    const store = transaction.objectStore('weeks');
    const request = store.get(league);
    
    request.onsuccess = () => {
      resolve(request.result?.weeks || []);
    };
    request.onerror = () => resolve([]);
  });
}

// Get PDF from IndexedDB
export async function getPDF(league, week) {
  await initDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(['pdfs'], 'readonly');
    const store = transaction.objectStore('pdfs');
    const request = store.get(`${league}_${week}`);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

// Get all leagues
export async function getAllLeagues() {
  await initDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(['leagues'], 'readonly');
    const store = transaction.objectStore('leagues');
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
}

// Get single league config
export async function getLeague(name) {
  await initDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(['leagues'], 'readonly');
    const store = transaction.objectStore('leagues');
    const request = store.get(name);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

// Save league configuration
export async function saveLeague(leagueConfig) {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['leagues'], 'readwrite');
    const store = transaction.objectStore('leagues');
    const request = store.put(leagueConfig);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Delete league and all associated data
export async function deleteLeague(leagueName) {
  await initDB();
  return new Promise(async (resolve, reject) => {
    try {
      // Delete league config
      const leagueTransaction = db.transaction(['leagues'], 'readwrite');
      const leagueStore = leagueTransaction.objectStore('leagues');
      await new Promise((res) => {
        const req = leagueStore.delete(leagueName);
        req.onsuccess = () => res();
        req.onerror = () => res();
      });
      
      // Delete weeks metadata
      const weeksTransaction = db.transaction(['weeks'], 'readwrite');
      const weeksStore = weeksTransaction.objectStore('weeks');
      await new Promise((res) => {
        const req = weeksStore.delete(leagueName);
        req.onsuccess = () => res();
        req.onerror = () => res();
      });
      
      // Delete all PDFs for this league
      const pdfsTransaction = db.transaction(['pdfs'], 'readwrite');
      const pdfsStore = pdfsTransaction.objectStore('pdfs');
      const index = pdfsStore.index('league');
      const pdfsRequest = index.openCursor(IDBKeyRange.only(leagueName));
      
      pdfsRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      pdfsRequest.onerror = () => resolve();
    } catch (error) {
      reject(error);
    }
  });
}

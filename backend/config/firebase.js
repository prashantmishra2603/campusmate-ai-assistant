const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Fallback in-memory database if Firebase is not configured
class MockFirestore {
  constructor() {
    this.collections = {};
  }
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection();
    }
    return this.collections[name];
  }
}

class MockCollection {
  constructor() {
    this.docs = [];
  }
  async get() {
    return {
      docs: this.docs.map(doc => ({
        id: doc.id,
        data: () => doc.data
      }))
    };
  }
  async add(data) {
    const id = require('crypto').randomBytes(16).toString('hex');
    this.docs.push({ id, data });
    return { id };
  }
  doc(id) {
    return new MockDoc(this, id);
  }
}

class MockDoc {
  constructor(collection, id) {
    this.collection = collection;
    this.id = id;
  }
  async delete() {
    this.collection.docs = this.collection.docs.filter(d => d.id !== this.id);
  }
  async update(data) {
    const doc = this.collection.docs.find(d => d.id === this.id);
    if (doc) {
      doc.data = { ...doc.data, ...data };
    }
  }
}

let db;

try {
  const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log('Firebase initialized successfully.');
  } else {
    console.warn('⚠️ serviceAccountKey.json not found. Using in-memory Mock Firestore for demonstration.');
    db = new MockFirestore();
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  db = new MockFirestore();
}

module.exports = { db };

interface Document {
    [key: string]: any;
}

class Collection {
    private collectionName: string;
    private collection: Document[];

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.collection = []; // Initialize as empty
        this.loadCollection();
    }

    private loadCollection(): void {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(this.collectionName);
            this.collection = data ? JSON.parse(data) : [];
        }
    }

    private saveCollection(): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.collectionName, JSON.stringify(this.collection));
        }
    }

    public find(query: Document): Document[] {
        return this.collection.filter(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }

    public findOne(query: Document): Document | undefined {
        return this.collection.find(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }

    public insert(document: Document): Document {
        const newDocument = { id: this.collection.length + 1, ...document };
        this.collection.push(newDocument);
        this.saveCollection();
        return newDocument;
    }

    public update(query: Document, updates: Document): Document | null {
        const item = this.findOne(query);
        if (item) {
            Object.assign(item, updates);
            this.saveCollection();
            return item;
        }
        return null;
    }

    public delete(query: Document): boolean {
        const initialLength = this.collection.length;
        this.collection = this.collection.filter(item => {
            return !Object.keys(query).every(key => item[key] === query[key]);
        });
        this.saveCollection();
        return initialLength !== this.collection.length;
    }

    public clear(): void {
        this.collection = [];
        this.saveCollection();
    }
}

class LocalStorageDB {
    private collections: { [key: string]: Collection } = {};

    public getCollection(collectionName: string): Collection {
        if (!this.collections[collectionName]) {
            this.collections[collectionName] = new Collection(collectionName);
        }
        return this.collections[collectionName];
    }
}

export const db = new LocalStorageDB();

export const settingsCollection = db.getCollection('settings');


// // Accessing the 'settings' collection
// const settingsCollection = db.getCollection('settings');
// settingsCollection.insert({ theme: 'dark', language: 'en' });
// console.log(settingsCollection.find({ theme: 'dark' })); // [{ id: 1, theme: 'dark', language: 'en' }]

// // Accessing the 'app' collection
// const appCollection = db.getCollection('app');
// appCollection.insert({ version: '1.0.0', name: 'MyApp' });
// console.log(appCollection.find({ name: 'MyApp' })); // [{ id: 1, version: '1.0.0', name: 'MyApp' }]
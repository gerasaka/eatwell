import { openDB } from "idb";
import { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } from "../constant/config";

export default class IndexDBService {
  dbPromise = new Promise(() => {});

  constructor() {
    this.dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      },
    });
  }

  async getAllBookmark() {
    return (await this.dbPromise).getAll(OBJECT_STORE_NAME);
  }

  async getRestaurant(id) {
    return (await this.dbPromise).get(OBJECT_STORE_NAME, id);
  }

  async putRestaurant(restaurant) {
    return (await this.dbPromise).put(OBJECT_STORE_NAME, restaurant);
  }

  async removevRestaurant(id) {
    return (await this.dbPromise).delete(OBJECT_STORE_NAME, id);
  }
}

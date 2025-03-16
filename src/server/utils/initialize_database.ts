import fs from 'node:fs/promises';
import { Database } from 'sqlite3';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  // product.idにインデックスを追加
  const db = new Database(DATABASE_PATH);
  db.serialize(() => {
    db.run('CREATE INDEX idx_feature_id ON feature_item (product_id)', (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  db.close();
};

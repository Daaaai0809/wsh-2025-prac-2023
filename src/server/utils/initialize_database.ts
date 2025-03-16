import fs from 'node:fs/promises';
import { Database } from 'sqlite3';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  // インデックスを追加
  const db = new Database(DATABASE_PATH);
  await new Promise<void>((resolve, reject) => {
    db.run('CREATE INDEX idx_feature_id ON feature_item (productId)', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  db.close();
};

import fs from 'fs';

const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (e) {
    return;
  }

  await fs.promises.unlink(filename);
};

// eslint-disable-next-line import/prefer-default-export
export { deleteFile };

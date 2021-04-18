import { app } from '@shared/infra/http/app';

const DEFAULT_PORT = 3000;

app.listen(DEFAULT_PORT, () => console.log(`Listen port ${DEFAULT_PORT}`));

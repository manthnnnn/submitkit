import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const nextCli = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const environment = { ...process.env };

if (environment.NODE_OPTIONS) {
  environment.NODE_OPTIONS = environment.NODE_OPTIONS
    .split(/\s+/)
    .filter((option) => option !== '--use-openssl-ca')
    .join(' ');
}

const build = spawn(process.execPath, [nextCli, 'build'], {
  stdio: 'inherit',
  env: environment,
});

build.on('error', (error) => {
  console.error('Could not start the Next.js production build:', error.message);
  process.exitCode = 1;
});

build.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
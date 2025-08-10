/**
 * 🧠 Node.js Skills Showcase
 * Run: node nodejs-skills-showcase.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const http = require('http');
const { EventEmitter } = require('events');
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    // === MAIN THREAD ===

    // 1. GLOBALS & PATHS
    console.log('📂 __dirname:', __dirname);
    console.log('📄 __filename:', __filename);

    // 2. OS INFO
    console.log('🖥 OS platform:', os.platform());
    console.log('🧮 Free memory:', os.freemem());
    console.log('👤 User info:', os.userInfo());

    // 3. FILESYSTEM
    fs.writeFileSync(path.join(__dirname, 'demo.txt'), 'Hello, Node.js!');
    const fileContent = fs.readFileSync(path.join(__dirname, 'demo.txt'), 'utf8');
    console.log('📄 File content:', fileContent);

    fs.appendFile(path.join(__dirname, 'demo.txt'), '\nAppended line!', (err) => {
        if (err) throw err;
        console.log('📌 Async append done!');
    });

    // 4. CRYPTO
    const hash = crypto.createHash('sha256').update('Node.js Showcase').digest('hex');
    console.log('🔐 SHA256 Hash:', hash);

    // 5. EVENTS
    const emitter = new EventEmitter();
    emitter.on('greet', (name) => console.log(`👋 Hello, ${name}`));
    emitter.emit('greet', 'Boss');

    // 6. HTTP SERVER
    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('🏠 Home Page - Node.js Skillshow\n');
        } else if (req.url === '/json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Hello from Node.js JSON endpoint' }));
        } else {
            res.writeHead(404);
            res.end('❌ Not Found');
        }
    });
    server.listen(3000, () => console.log('🚀 HTTP server running on http://localhost:3000'));

    // 7. WORKER THREADS
    const worker = new Worker(__filename);
    worker.on('message', (msg) => console.log('💬 From worker:', msg));

    // 8. TIMERS
    setTimeout(() => console.log('⏳ Timeout triggered!'), 1000);
    setInterval(() => console.log('⏰ Interval tick'), 2000);

    // 9. PROCESS
    console.log('⚙️ Process ID:', process.pid);
    console.log('🌍 Current working dir:', process.cwd());
    console.log('🔍 Node.js version:', process.version);

    // Exit after 6 seconds
    setTimeout(() => {
        console.log('👋 Exiting showcase...');
        process.exit(0);
    }, 6000);

} else {
    // === WORKER THREAD CODE ===
    parentPort.postMessage(`Worker says hi! PID: ${process.pid}`);
}


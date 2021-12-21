const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require("fs");

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";

app.use(morgan('dev'));

const config = JSON.parse(fs.readFileSync('src/config.json', 'utf8'));
config.services.forEach(service => {
    if(service.isStatic) {
        app.use(service.path, express.static(`services/${service.name}`))
        return;
    }

    const router = require(`../services/${service.name}/${service.entryPoint}`);
    app.use(service.path, router)
})

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
# Office Roulette Client

A React based web-client for
[Office Roulette Server](https://github.com/mskcode/office-roulette-server).

## Development

### Quick Start

By the time of writing this simplest way to locally develop this application
is to also clone the
[Office Roulette Server](https://github.com/mskcode/office-roulette-server)
and start that as the actual backend.

```shell
git clone https://github.com/mskcode/office-roulette-server.git
cd office-roulette-server/docker
docker-compose up --build
```

Once the backend is up and running, start the frontend.

```shell
npm ci     # install node module versions in the shrinkwrap
npm start
```

The `npm start` command should start a local development server on port `3000`
and open a browser pointing to it, but if this doesn't happen you can point
your browser yourself to URL `http://localhost:3000`.

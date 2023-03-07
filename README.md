# Nymph Svelte Template

An app template using Nymph.js, SMUI, and SvelteKit.

# Structure

This repository contains two separate parts.

- `app`: The main web/server app.
  This app uses, [Nymph.js](https://nymph.io), [SMUI](https://sveltematerialui.com/), and [SvelteKit](https://kit.svelte.dev/). It runs a server with a Nymph endpoint and a Nymph PubSub server. It serves the front end browser app.
- `commands`: The server utility commands.
  These commands are meant to be run on a live server and help you manage the data for the app.

All parts use [Nymph.js](https://nymph.io/) to handle data.

# Development

In development, Nymph is configured to use a SQLite3 database, `development.db` in the root folder.

Use `npm run dev` in `app` to run the dev server. It will then be available at http://localhost:5173/.

# Starting Development Server

```
# Install pm2
sudo npm i -g pm2

# Start the Managed Server
sudo pm2 start pm2.config.cjs --env development

# Restart the Servers (after a rebuild)
sudo pm2 restart all
```

# Starting Production Server

```
# Install pm2
sudo npm i -g pm2

# Start the Managed Server
sudo pm2 start pm2.config.cjs --env production

# Save the process list and set to start up on system start.
sudo pm2 save
sudo pm2 startup systemd

# Restart the Servers (after a rebuild)
sudo pm2 restart all
```

## Prereqs

```sh
# You might need this on Ubuntu/Debian
sudo apt install nodejs npm
# Or this on Manjaro/Arch
sudo pamac install nodejs-lts-erbium

# Then get them all on the same version of node.
sudo npm i -g n
# You can use a higher version, but 16 is the minimum.
sudo n 16
sudo npm i -g npm@latest
```

# Copyright

Copyright 2023 SciActive Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
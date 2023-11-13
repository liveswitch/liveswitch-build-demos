# Instructions

This example app is intended to allow you to see how to create a basic conference app using the LiveSwitch SDK.


This app runs on desktop and mobile browsers and supports landscape and portrait mobile orientations.


It will dynamically update the layout to support the number of participants in the call and support basic chat functionality.


The application is broken into 4 sections, the SDK plugin which contains most of the LiveSwitch SDK logic, the vuex store inside main.ts which manages the in app state machine and contains some LiveSwitch SDK logic as well, the layouts which are in the src/components/ folder, and the application logic which is in the src/views/ folder.


The Home suite of files represents the logic for the lobby/entry page and allows you to set a display name and select a channel. In order for 2 users to connect, they must join the same channel.


The InCall suite of files represents the in call logic.  This is where the initial connection is established and where you will most likely want to make adjustments based on your use case.


All styling is controlled inside src/assets/css/app.css and you change the colors in this file to match your theme.


I would also recommend uploading your own logo under src/assets. A standard logo and a small logo are recommended to support the different screen sizes.

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

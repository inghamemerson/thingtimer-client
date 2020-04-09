# Thing Timer Client

## About

The Thing Timer Client is a frontend application that interacts with the [Thing Timer API](https://github.com/inghamemerson/thingtimer-api) to create and manage the lifespan of `Things`. Inspired by the [toilet paper calculator](https://howmuchtoiletpaper.com) of the COVID-19 pandemic, my hope was to create something lighthearted and potentially useful. At the same time I wanted to learn some new tech and showcase my code for some [rad people](https://www.gloo.us). Any code pulled from or inspired by other is typically linked in the top of the file.

The client calculates the lifespan of a given `Thing` by averaging the duration of all completed `Timers` associated with it. If a quantity is present, it will multiply that liefspan by the quantity to calculate how lang the current amount of the `Thing` will last.

## What it uses

- [JavaScript](https://www.javascript.com)
- [Node](https://nodejs.org/en/) JavaScript runtime. We need 10 or later here.
- [React](https://reactjs.org) JS UI library.
- [Nextjs](https://nextjs.org) React framework.
- [Apollo](https://www.apollographql.com) GraphQL implementation.
- [Emotion](https://emotion.sh/docs/introduction) styling.
- [MaterialUI](https://material-ui.com) React UI components
- [Yarn](https://yarnpkg.com) for JS dependency management.

## Getting Started

To get this up and running, make sure you have Node installed. You can get away with using NPM as the dependency manager as well if you'd like but the lock file won't do you any good which may cause some issues.


1. To get started make sure you are in the root directory of the project. We're going to start by installing our dependencies
```
yarn
```
 
2. Now we need to specify what backend we are going to be talking to. This is currently set up to talk to a local instance of the [Thing Timer API](https://github.com/inghamemerson/thingtimer-api) but you can change it to chat with the remote server by udpating [this line](https://github.com/inghamemerson/thingtimer-client/blob/master/apolloClient.js#L14) to the address `https://api.thingtimer.com/graphql`.

3. To kick off the client, in the root directory you can run `yarn dev` to start the dev server. If you have a port conflict, you can specify one with `yarn run dev -p <PORT>`.

4. You should be up and running! Check out the URL announced in your terminal and play around.

## Where the meat is

### Setup
There is some massaging to get Apollo and Material UI running in here. This is mainly in [pages/_app.js](https://github.com/inghamemerson/thingtimer-client/blob/master/pages/_app.js) and [pages/_document.js](https://github.com/inghamemerson/thingtimer-client/blob/master/pages/_document.js).

There is only one page here and [pages/index.js](https://github.com/inghamemerson/thingtimer-client/blob/master/pages/index.js) is fairly light, getting our entry setup for us.

### Components
All of the components live in the top level of [components](https://github.com/inghamemerson/thingtimer-client/tree/master/components). They are broken out roughly by their purpose. without going woo wild abstracting anything out too agressively. The [Link](https://github.com/inghamemerson/thingtimer-client/blob/master/components/Link.js) component is not used but was added to allow Material UI's `<Link />` to work with the Next.js component of the same name.

### Data
All of the `Things` are initially fetched from the backend in [components/ListThings.js](https://github.com/inghamemerson/thingtimer-client/blob/master/components/ListThings.js#L30-L32). It is currently set up to poll and update from the server as I ran into some snags updating the local state along the way and am part way through getting it figured out.


## What's next
Some notes I have in mind for the future if I continue to tinker on this:
- [ ] Update local state instead of polling
- [ ] Create user accounts or create a local token to scope Things to one machine
- [ ] Clean and organize components
- [ ] Improve user experience of adding/deleting things adn managing timers
- [ ] Allow editing of Thing name and quantity
- [ ] Allow editing of timer name, start, and end

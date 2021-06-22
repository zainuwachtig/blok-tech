!(Banner)[./blok-tech.wiki/images/Banner-01.png]

# Airies

Airies is a matching application, like tinder but then for air max. I made this application as a school project for the 3rd quarter in the second year, more information about the courses can be found on [this Github page](https://github.com/cmda-bt). The whole process is documented (in Dutch) in the [wiki](https://github.com/zainuwachtig/blok-tech/wiki).

## Concept

With Airies you can fill in the air max models you like, based on your preferences you will get a selection of shoes which you can like (🔥) or dislike (🗑). You can find an image, the name, the stylecode and the year of the shoe on the cards. You can also superlike your favourites, they get a yellow / golden border, so you can easily find them in the list of liked shoes!

## Build with

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [MongoDB](https://www.mongodb.com/)
- [GIT](https://git-scm.com/)
- [stockx-api](https://www.npmjs.com/package/stockx-api)
- :heart:

## Installation

Before you use this application, make sure you have installed node.js and git. Once installed, use the terminal within your directory.

1. Clone this repository:

```
git clone https://github.com/zainuwachtig/blok-tech.git
```

2. Install [NPM](https://www.npmjs.com/get-npm) in the root of the directory:

```
npm install
```

3. Start the local server:

```
npm start
```

## Database

I used [MongoDB](https://docs.mongodb.com/manual/introduction/) as database for my application. In the database is a collection for the users and their liked / dislikes shoes and also a collection for the shoes in the application. To see how this is structured, check [Database structure](https://github.com/zainuwachtig/blok-tech/wiki/database) in the wiki.

## License

[MIT](https://github.com/zainuwachtig/blok-tech/blob/master/LICENSE)

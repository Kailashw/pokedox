# Storing Contact Details using React Hooks

The purpose of this project is to demonstarte listing, categorizing of pokemons. In this example we will try to build a sample list to fetch pokemons, categorize them based on user interest, reorder them with in category, undo the reorder selection to one level and delete category. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Live Demo at <https://pokedox-95c8c.firebaseapp.com/>

## To get started

Assuming that you have [npm](https://www.npmjs.com/get-npm) installed in your machine. Please follow below steps, in the project directory, please run following commands:

*  `yarn install` or `npm install`
*  `yarn start`

## Folder structure Approach
I have segregated files based on what they do in different folders. Components which have external API actions and maintain their own internal state are put in to containers, Components which maintain their own internal state are put in to components and components which just consume the data and perform render options are put in views folder.  

```
src
├── assets
│   └── logo.svg
│   └── hamburger.svg
├── components
│   └── card.js
│   └── Modal.js
├── container
│   └── TabPanel.js
└── index.js
└── index.css
└── App.js
└── App.css
└── setupTests.js
└── serviceWorker.js
```

## Help Links
I have used @material-ui/core for speed development of UI components.
* [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) 


### Tasks

- [x] Publish code to FireBase.
- [x] Update readme file.
- [x] Create/Delete Category operation in DB.
- [x] Move items to Respective Category after Create Category.
- [ ] add to Existing category.
- [ ] Save button on re-rdering. 
- [ ] Retrive them in saved order.
- [x] Break Card component in to draggable only and checkable only cards.

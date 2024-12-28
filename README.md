# Web Template
The purpose of this project is to serve as a lightweight starter for web applications.

## Smoke test
- `yarn install`
- `yarn start`
- Open the application
- You should be presented with a pomodoro timer

## Clone from github
- git clone <repo url> project-name

## Clone from local
If you already have the project from git, use it to clone into your new project directory
- `rsync -av --progress web-template/* ./<new-project-dir>/ --exclude '.git' --exclude node_modules/ --exclude *idea --exclude docs`
- `git init`

## Tailwinds installation
https://tailwindcss.com/docs/installation
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Dependencies
Check for outdated deps
```bash
yarn outdated
yarn outdated v1.22.22
info Color legend : 
 "<red>"    : Major Update backward-incompatible updates 
 "<yellow>" : Minor Update backward-compatible features 
 "<green>"  : Patch Update backward-compatible bug fixes
Package                Current Wanted Latest  Package Type    URL                                                                               
@testing-library/react 13.4.0  13.4.0 16.1.0  devDependencies https://github.com/testing-library/react-testing-library#readme                   
@vitejs/plugin-react   1.3.2   1.3.2  4.3.4   devDependencies https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#readme
babel-jest             27.5.1  27.5.1 29.7.0  devDependencies https://github.com/jestjs/jest#readme                                             
daisyui                3.9.4   3.9.4  4.12.23 dependencies    https://daisyui.com                                                               
eslint                 8.57.1  8.57.1 9.17.0  devDependencies https://eslint.org                                                                
jest                   28.1.3  28.1.3 29.7.0  devDependencies https://jestjs.io/                                                                
jest-environment-jsdom 28.1.3  28.1.3 29.7.0  devDependencies https://github.com/jestjs/jest#readme                                             
prettier               2.6.2   2.6.2  3.4.2   devDependencies https://prettier.io                                                               
react                  18.3.1  18.3.1 19.0.0  dependencies    https://react.dev/                                                                
react-dom              18.3.1  18.3.1 19.0.0  dependencies    https://react.dev/                                                                
react-router-dom       6.28.1  6.28.1 7.1.1   dependencies    https://github.com/remix-run/react-router#readme                                  
vite                   3.2.11  3.2.11 6.0.6   devDependencies https://vite.dev      
```
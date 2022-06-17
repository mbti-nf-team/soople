// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBCL3Hqu9z9gJMQNaLMM776KdzuF-2S3pg',
  authDomain: 'dev-jennie-harang-conners.firebaseapp.com',
  projectId: 'dev-jennie-harang-conners',
  storageBucket: 'dev-jennie-harang-conners.appspot.com',
  messagingSenderId: '226162039421',
  appId: '1:226162039421:web:c48e322d66865f2467ef14',
});

attachCustomCommands({ Cypress, cy, firebase });

import express from 'express';
import noteController from '../controllers/noteController.js'
import { localAuth } from '../authentication/auth.js'; //importing local authentication strategy from passport authentication
import userController from '../controllers/userController.js';
import { validateUserRegistration, validateUserLogin} from '../validationMiddleware/validator.js';
import {isAuthenticated} from '../authentication/isAuthenticated.js';
import { logoutHandler } from '../handlers/logoutHandler.js';
import { catchErrors } from '../handlers/routeErrorHanlder.js';
const router = express.Router();


router.get('/register', (req, res) => res.render('register', { 
  errors: {}, //our register.ejs expect array and formData object so we have to pass both here as well even if there is no error
  formData: {},
  title:'Register'
}));

//user registration route that first go through validation middleware and then to userController
router.post('/register', validateUserRegistration, userController.createUserController);



router.get('/login', (req, res) => res.render('login', {
   errors: {},
   title:'Login',
   formData: {}
}));

router.post('/logout',logoutHandler);

// Passport authentication route

router.post('/login',
    validateUserLogin,localAuth);

router.get('/', (req, res) => {
  res.render('home',{
     title: 'Welcome to NoteApp',
  }
  );
});

router.get('/add', isAuthenticated,
  catchErrors(noteController.addNote));
router.post('/add',isAuthenticated,catchErrors(noteController.createNote));

router.get('/notes',isAuthenticated,catchErrors(noteController.getAllNotes));

router.get('/:slug/edit',catchErrors(noteController.editNote));

router.post('/:slug/edit',catchErrors(noteController.updateNote));

router.delete('/:id/delete',catchErrors(noteController.deleteNote));


export default router;
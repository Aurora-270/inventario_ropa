const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
/*
//todos las rutas debajo estaran dentro de la seguridad de las sessions
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});
*/
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

// ======= paginas vestido ================================

const MEDI= require('../models/vestido');

router.get('/vestido',isAuthenticated, async(req, res, next) => {
  const medi = await MEDI.find();
  res.render('vestido', {medi} );
});

router.post('/agregar-vestido',isAuthenticated,async(req,res,next)=>{
  const medi =new MEDI(req.body);
  await medi.save();
  res.redirect('/vestido');
});

router.get('/agregar-vestido',isAuthenticated, async(req, res, next) => {
  res.render('agregar-vestido');
});

router.get('/editar-vestido/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const editar_m = await MEDI.findById(id);
  res.render('editar-vestido',{editar_m});

});

router.post('/editar-vestido/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await MEDI.updateOne({_id:id},req.body);
  res.redirect('/vestido');
});

router.get('/delete_m/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await MEDI.remove({_id:id});
   res.redirect('/vestido');
});

// ======= paginas ensambles ================================

const PRODU= require('../models/ensambles');

router.get('/ensambles',isAuthenticated, async(req, res, next) => {
  const produ = await PRODU.find();
  res.render('ensambles', {produ} );
});

router.post('/agregar-ensambles',isAuthenticated,async(req,res,next)=>{
  const produ =new PRODU(req.body);
  await produ.save();
  res.redirect('/ensambles');
});

router.get('/agregar-ensambles',isAuthenticated, async(req, res, next) => {
  res.render('agregar-ensambles');
});

router.get('/editar-ensambles/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const editar_p = await PRODU.findById(id);
  res.render('editar-ensambles',{editar_p});

});

router.post('/editar-ensambles/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await PRODU.updateOne({_id:id},req.body);
  res.redirect('/ensambles');
});

router.get('/delete_p/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await PRODU.remove({_id:id});
   res.redirect('/ensambles');
});


// =================================

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;
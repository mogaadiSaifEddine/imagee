const express =require('express')
const eJs =require('ejs')
const multer =require('multer')
const path =require('path')


// set store engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {           // set the destination where we store the image
        cb(null, './public/upload')
    },
    filename : function (req , file , cb){      // set the name of the image after we store it 
        cb(null,file.fieldname+'-'+Date.now()+ file.originalname)

    }
})
// init upload 
const upload = multer({
    storage : storage 
,fileFilter : function(req,file ,cb){
    checkfiletype (file, cb)

}
}).single('imageup')  

//check file type 
function checkfiletype (file, cb) {
    //allowed ext 
    const fileTypes =/jpeg|jpg|png/;
    // chechk the ext
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
// check mine type
const mimetype= fileTypes.test(file.mimetype)

if (mimetype && extName){
    return cb(null,true)
}
else{
   console.log('only images are accepted')
}
}
// init app
const app =express()

//EJS
app.set('view engine', 'ejs')

//public foolder
app.use(express.static('./public'))

//router
app.post('/upload',(req,res)=>{
    upload (req ,res ,(err)=>{
      if (err){
          res.render('app',
{          msg : err
});
      }
      else {
          console.log(req.file)
          res.render('app',{
              msg: 'File uploaded',
              file : `../public/upload/${req.file.filename}`
          })
      }  
    })
})


const port = 3000
app.get('/',(req,res)=>res.render('app'))

app.listen(port, ()=>console.log(`server on ${port}`))
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
}).single('imageup')  

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
          res.send('test ')
      }  
    })
})


const port = 3000
app.get('/',(req,res)=>res.render('app'))

app.listen(port, ()=>console.log(`server on ${port}`))
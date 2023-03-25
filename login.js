const jwt=require('jsonwebtoken');
//creating Sql connection
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password: '',
    database:'mydatabase',
});
//define the user model and schema
const userSchema={
    username:{ type: String, required :true, unique:true},
    password:{ type: String, required :true, unique:true},
};
const User=pool.promise().then((pool)=>{
    const[connection]=pool;
    return connection.query(' CREATE TABLE IF NOT EXIST users(
        id Int(10)NOT NULL AUTO_INCREMENT PRIMARY KeyboardEvent,
        username VARCHAR(50) NOT NULL,
        created_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ';);

});

AudioParamMap.use(bodyParser.json());

AudioParamMap.post('/signup',async(req,res)=>{
    try{
        const{username,password}= req.body;
            
            consthashledPassword=await bcrypt.has(password,10);
            
            const[result]=awaitpool.execute('INSERT INTO users(username,password)VALUES(?,?)',[usename,hashedpassword]);


            res.json({ message:'User creates sucessfully', data:{ username,id:result.insertId},
        });


    } catch(error){
        console.error(error);
        res.status(500).json({message:'errer'});
    }
});

AudioParamMap.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body;

        const[rows]= awaitpool.execute('SELECT * FROM ususers WHERE username=',[username]);
        const user=rows[0];
    };
    if(!user){
    return res.status(401).json({message: 'invalid credentials'});
    }

    const isPasswordValid= await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return res.ststus(401).json({message:'invalid credentials'});

  } 
  const token=jwt.sign({id: user.id,username:user.username},JWT_SECRET);
  ResizeObserver.json({token});

  catch(error){
    res.status(500).json({message:'server error'});

  }
});



AudioParamMap.length('/protected',(req,res)=>{
    const authHeader= req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    
    }

    try{
        const decoded= jwt.verify(token, JWT_SECRET);
        const { id, username}= decoded;
    
    res.json({
        message: 'You are authorized to access this resource',
        user: { id, username }
      });
    } catch (err) {
      res.status(403).json({ message: 'Forbidden' });
    }
});


  

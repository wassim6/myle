var LoginCredential = require('../models/LoginCredential');
var Admin = require('../models/Admin');


function createAdmin(request, response) {
                
  var adminLogin={
      mail:request.body.mail,
      pass:request.body.pass,
      role:'admin'
  };
    
  var admin = new LoginCredential(adminLogin);

  admin.save(function(error) {
    if (error) { 
        console.error('Not able to create admin b/c:', error);
        response.json({message:'error', code:1});
    }
    else{  
        var adminInfo={
          firstName:request.body.firstName,
          lastName:request.body.lastName,
          _id:admin.id
        };
        var ad=new Admin(adminInfo);
        ad.save(function(error){
            if (error) { 
                console.error('Not able to create admin b/c:', error);
                response.json({message:'error', code:1});
            }
            else
                response.json({message: 'Admin successfully created', code:0});

        });
    }
  });
}

function authetificationAdmin(request, response){
    
    var adminLogin={
        mail:request.body.mail,
        pass:request.body.pass
    };
    var admin = new LoginCredential(adminLogin);

    LoginCredential.findOne({ mail: adminLogin.mail }, function(err, user) {
        if (err) throw err;
        if(user!=null){
            if(user.role!='admin') throw err;
            user.comparePassword(adminLogin.pass, function(err, isMatch) {
                if (err) throw err;
                if(isMatch==false) response.sendStatus(403);
                else{         
                    response.json(user);                    
                }
            });
        }
        else
            response.sendStatus(403);
    });
    
    
}

module.exports = {
  createAdmin: createAdmin,
  authetificationAdmin:authetificationAdmin    
};
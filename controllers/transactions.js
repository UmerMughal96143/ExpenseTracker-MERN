const Transaction = require('../modal/Transactions');


// Get All Transactons
// Get api/v1/transactions 
//access public 

exports.getTransactions = async(req , res , next) => {
    
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success : true ,
            count : transactions.length ,
            data : transactions,
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            error : 'Server Error'
        })
        
    }
}

// Add Transactons
// POST api/v1/transactions 
//access public 

exports.addTransactions = async(req , res , next) => {
    try {

        const { text, amount } = req.body ;
        const transaction = await Transaction.create(req.body);
        console.log(transaction);
        return res.status(201).json({
          success: true,
          data: transaction,
        }); 
        
    } catch (err) {
      if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message)
      
        return res.status(500).json({
          success: false,
          err: messages,
        });
      }else {
         return res.status(500).json({
           success: false,
           error: "Server Error",
         });
      }

    }
    
}

// DELETE Transacton
// Delete api/v1/transactions 
//access public 

exports.deleteTransactions = async(req , res , next) => {
    try {

         const transaction = await Transaction.findById(req.params.id);

         if (!transaction) {
           return res.status(404).json({
             success: false,
             error: "Such Id Not Found",
           });
         }

         await transaction.remove();
         return res.status(200).json({
             success : true ,
             data : {}
         })
        
    } catch (error) {
        
         return res.status(500).json({
           success: false,
           err: "Server Error",
         });
    }
   
}
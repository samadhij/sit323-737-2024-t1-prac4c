// Importing required modules

// Express module for handling HTTP requests
const express= require("express");
const res = require("express/lib/response");
// FS for file system operations
const fs = require('fs');
// Winston for logging
const winston = require('winston');

// Creating an Express application instance
const app= express();

//Creating a logger instance using winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-microservice' },
    transports: [

      //This will write log messages to the console
      new winston.transports.Console({
        format: winston.format.simple(),
        }),

      // - This will write all logs with importance level of `error` or less to `error.log`
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

      // - This will write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });
  

// Addition function
const add= (num1,num2) => {
    return num1+num2;
}

// Subtraction function
const sub= (num1,num2) => {
  return num1-num2;
}

// Multiplication function
const multiply= (num1,num2) => {
  return num1*num2;
}

// Division function
const divide= (num1,num2) => {
  return num1/num2;
}

// Exponentiation function
const exp= (base,exponent) => {
  return Math.pow(base, exponent);
}
// Square Root function
const sqroot= (num) => {
  return Math.sqrt(num);
}
// Modulo function
const modulo= (num1,num2) => {
  return num1%num2;
}

// Addition endpoint
app.get("/add", (req,res)=>{
    try{
    const num1= parseFloat(req.query.num1);
    const num2=parseFloat(req.query.num2);
    if(isNaN(num1)) {
        logger.error("num1 is incorrectly defined");
        throw new Error("num1 incorrectly defined");
    }
    if(isNaN(num2)) {
        logger.error("num2 is incorrectly defined");
        throw new Error("num2 incorrectly defined");
    }
    if (!isFinite(num1) || !isFinite(num2) ) { 
      logger.error("input cannot be infinity");
      throw new Error("input cannot be infinity");
  }

    // Logging the request
    logger.log({
      level: 'info',
      message: `New addition operation requested: ${num1} + ${num2}`,
    });
    
    logger.info('Parameters '+num1+' and '+num2+' received for addition');
    const result = add(num1,num2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});


//Subtraction endpoint
app.get("/subtract", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }
      if (!isFinite(num1) || !isFinite(num2) ) { 
        logger.error("input cannot be infinity");
        throw new Error("input cannot be infinity");
    }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New subtraction operation requested: ${num1} - ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for subtraction');
      const result = sub(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Multiplication endpoint
app.get("/multiply", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }
      if (!isFinite(num1) || !isFinite(num2) ) { 
        logger.error("input cannot be infinity");
        throw new Error("input cannot be infinity");
    }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New multiplication operation requested: ${num1} * ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for multiplication');
      const result = multiply(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Division endpoint
app.get("/divide", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }
      if (num2 === 0) {
          logger.error("cannot divide by zero");
          throw new Error("division by zero");
      }
      if (!isFinite(num1) || !isFinite(num2) ) { 
        logger.error("input cannot be infinity");
        throw new Error("input cannot be infinity");
    }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New division operation requested: ${num1} / ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for division');
      const result = divide(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Exponentiation endpoint
app.get("/exponentiate", (req, res) => {
  try {
      const base = parseFloat(req.query.base);
      const exponent = parseFloat(req.query.exponent);
      if (isNaN(base)) {
          logger.error("base is incorrectly defined");
          throw new Error("base incorrectly defined");
      }
      if (isNaN(exponent)) {
          logger.error("exponent is incorrectly defined");
          throw new Error("exponent incorrectly defined");
      }
      if (base === 0 && exponent < 0) {
        logger.error("exponentiation of 0 to negative power results in division by zero");
        throw new Error("exponentiation of 0 to negative power results in division by zero");
    }
    if (base < 0 && !Number.isInteger(exponent)) {
      logger.error("Exponentiation of a negative base to a non-integer exponent is not supported. The result involves complex numbers");
      throw new Error("Exponentiation of a negative base to a non-integer exponent is not supported. The result involves complex numbers");
  }
  if (!isFinite(base) || !isFinite(exponent) ) { 
    logger.error("input cannot be infinity");
    throw new Error("input cannot be infinity");
}

      logger.info(`Parameters ${base} and ${exponent} received for exponentiation`);
      const result = exp(base,exponent) ;
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.message });
  }
});

// Square Root endpoint
app.get("/squareroot", (req, res) => {
  try {
      const num = parseFloat(req.query.num);
      if (isNaN(num)) {
          logger.error("num is incorrectly defined");
          throw new Error("num incorrectly defined");
      }
      if (num < 0) {
        logger.error("num cannnot be less than zero");
        throw new Error("num cannnot be less than zero");
    }
    if (!isFinite(num)) { 
      logger.error("num cannot be Infinity");
      throw new Error("num cannot be Infinity");
  }

      logger.info(`Parameter ${num} received for square root`);
      const result = sqroot(num);
      
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.message });
  }
});

// Modulo
app.get("/modulo", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 (dividend) is incorrectly defined");
          throw new Error("num1 (dividend) incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 (divisor) is incorrectly defined");
          throw new Error("num2 (divisor) incorrectly defined");
      }
      if (num2 === 0) {
        logger.error("num2 (divisor) cannnot be zero");
        throw new Error("division by zero:num2 (divisor) cannnot be zero");
    }
    if (!isFinite(num1) || !isFinite(num2) ) { 
      logger.error("input cannot be infinity");
      throw new Error("input cannot be infinity");
  }

      logger.info(`Parameters ${num1} and ${num2} received for modulo operation`);
      const result = modulo(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.message });
  }
});


const port=3040;
app.listen(port,()=> {
    console.log("Calculator microservice is running on port "+port);
})
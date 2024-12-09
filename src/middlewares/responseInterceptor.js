const responseInterceptor = (req, res, next) => {
    const oldSend = res.json;
    res.json = (data) => {
      const formattedResponse = {
        success: true,
        data: data.data || {},
        message: data.message || "Success",
        error: null,
        timestamp: new Date().toISOString(),
      };
      oldSend.call(res, formattedResponse);
    };
  
    res.error = (error, statusCode = 500, message = "Internal Server Error") => {
      const formattedResponse = {
        success: false,
        data: {},
        message,
        error,
        timestamp: new Date().toISOString(),
      };
      res.status(statusCode).json(formattedResponse);
    };
    next();
  };
  
  export default responseInterceptor;
  
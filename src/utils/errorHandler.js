class errorHandler extends Error {
    constructor(
        stastuscode,
        message = "Something went wrong !!",
        errors = [],
        stack = ""
    ){
       super(message)
       this.stastuscode = stastuscode;
       this.data = null;
       this.message = message;
       this.success = false ;
       this.errors = errors

       if (stack){
        this.stack = stack
       }else{
        Error.captureStackTrace(this ,this.constructor)
       }
    }
}

export { errorHandler }
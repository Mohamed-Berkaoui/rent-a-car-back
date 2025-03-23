class AppError {
    constructor(data) {
        this.status = "ERROR";
        this.message = data;
      }
}


module.exports=AppError
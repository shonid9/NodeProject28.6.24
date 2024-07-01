class BizCardsError extends Error {
//our props are status and message
  
  status: number;
  //the constructor takes in a message and status
  //and calls the super class with the message
  //and sets the status to the status passed in
  //this is a custom error class
  
  constructor(message: string, status: number) {
    super(message);

    this.status = status;
  }
}

export { BizCardsError };

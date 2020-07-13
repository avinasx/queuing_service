class Queue {

  constructor() {
    if (!Queue.instance) {
      this.size = 5;
      this.rearPointer = -1;
      this.frontPointer = -1;
      this.q = new Array();
      this.ack = false;
      Queue.instance = this;
    }
    return Queue.instance;
  }

  enQueue(msg) {
    if ((this.rearPointer == this.size - 1 && this.frontPointer == 0) || (this.rearPointer == this.frontPointer - 1)) {
      console.log("!!! Queue Overflow !!!");
    } else if (this.frontPointer == -1) {
      this.frontPointer = 0;
      this.rearPointer = 0;
      this.q[this.rearPointer] = msg;

    } else if (this.rearPointer == this.size - 1 && this.frontPointer != 0) {

      this.rearPointer = 0;
      this.q[this.rearPointer] = msg;
    } else {
      this.rearPointer += 1;
      //  console.log(this.rearPointer);
      this.q[this.rearPointer] = msg;
    }
  }

  deQueue() {
    if (this.frontPointer == -1) {
      return "!!! Under Flow !!!";
    }
    let msg = this.q[this.frontPointer];
    return msg;
  }

  display() {
    console.log("Front pointer : " + this.frontPointer + ",  Rear pointer : " + this.rearPointer);
    console.log(this.q);
  }

  front() {
    if (this.frontPointer !== -1)
      return this.q[this.frontPointer];
    console.log("Empty Queue");
  }

  ackMessage(msg) {
    if (msg == "success" && this.frontPointer !== (-1)) {
      this.q[this.frontPointer] = undefined;
      if (this.frontPointer == this.rearPointer) {
        this.frontPointer = -1;
        this.rearPointer = -1;
      } else if (this.frontPointer == this.size - 1) {
        this.frontPointer = 0;
      } else {
        this.frontPointer += 1;
      }
      //this.ack = true;
    }
    //this.ack = false;
  }

  rear() {
    if (this.rearPointer !== -1)
      return this.q[this.rearPointer];
    console.log("Empty Queue");
  }

  size() {
    return this.size;
  }

}

const queue = new Queue();

module.exports = {
  queue: queue
}

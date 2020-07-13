# queuing_service
An Implementation of Queuing service in NodeJS

Problem Statement:
https://gist.github.com/ankitwww/38bb53aa960d0de47e808851000fc0d7


##installation:

Install Node.js

run `npm install`




##Usage:

####There are three files in the project:

  1. queueServer.js: Starts the que server.
  2. producer.js: Add tasks to the queue. Takes arguments as tasks.  
  3. consumer.js: Consumes tasks

##Examples:

CD to the project directory

     run `node queueserver.js` to start the queue server, defaut port is 8080. leave the terminal running to see the corresponding responses of producer and consumer here.

     In another terminal(in project directory) 

     run `node producer.js task1 task2 rask3` to add tasks to the queue(maximum 5), here task1, task2 et.c. are tasks, on adding you will see the list of tasks in queserver terminal.

     run `node consumer.js` to consume task, each time this file runs, it consumes one task from the queue, current queue status can be seen in server terminal.
        

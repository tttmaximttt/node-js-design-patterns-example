const co = require('co');

class TaskQueue {
	constructor(concurency) {
		this.concurency = concurency;
		this.runing = 0;
		this.taskQueue = [];
		this.consumerQueue = [];
		this.spawnWorkers(concurency);
	}
	
 	pushTasks(task) {
	  if (this.consumerQueue.length !== 0) {
		  this.consumerQueue.shift()(null, task);
	  } else {
		  this.taskQueue.push(task);
	  }
  }
	
	spawnWorkers(concurency) {
		const self = this;
		
		for(let i = 0; i < concurency; i++) {
			co(function* () {
				while (true) {
					const task = yield self.nextTask();
					yield task;
				}
			});
		}
	}

	nextTask() {
		return callback => {
			if (this.taskQueue.length !== 0) {
				return callback(null, this.taskQueue.shift())
			}
			this.consumerQueue.push(callback);
		}
	}
}
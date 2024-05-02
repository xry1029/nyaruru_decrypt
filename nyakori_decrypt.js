// 线程池...
class Taskset {
  constructor() {
    this.tasks = [];
    this.globallock = 0;
  }

  appendTask(fn, ...args) {
    const task = { fn, args };
    this.tasks.push(task);
  }

  async processTasks() {
    if (this.globallock === 1) {
      return;
    }

    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      this.globallock = 1; // 加锁
      await task.fn(...task.args);
	  await new Promise(resolve => setTimeout(resolve, 100)); // sleep 100ms
    }
  }
}


function decrypts(name1, lock) {
    filenames = "";
    filenames = name1;
    console.log('Decrypting: ' + filenames)
    request2 = new XMLHttpRequest();
    request2.open('GET', "img/" + filenames);
    request2.responseType = "arraybuffer";
    request2.send();
    request2.onloadend = function () {
        decrypted_data = request2.response
            pe.gxxx("img/" + filenames, decrypted_data)
            if (decrypted_data == null) {
                console.log("Decrypt error: " + name1)
            } else {
                data = new Blob([decrypted_data]);
                formData = new FormData();
                formData.append("file", data, name1);
                request3 = new XMLHttpRequest();
                request3.open('PUT', 'http://127.0.0.1:48765/upload');
                request3.send(formData);
            }
    taskset.globallock = 0; //解锁
	return true
	}
}
taskset = new Taskset()
request1 = new XMLHttpRequest();
request1.open('GET', 'http://127.0.0.1:48765/filelist.json'); // exec: find img > filelist.json
request1.send();
request1.onloadend = function () {
    filejson = JSON.parse(request1.response);
    for (name in filejson) {
        taskset.appendTask(decrypts, name);
    }
	taskset.processTasks()
}

// Inject:
// var script = document.createElement("script"); script.src = '/nya_decrypt.js'; document.body.appendChild(script);

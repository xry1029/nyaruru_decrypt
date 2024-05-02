for(name in PackageManager._index)
    {
        console.log('uploading: '+name)
        data = new Blob([PackageManager.getResource(name)]);
		var formData = new FormData(); 
		formData.append("file", data, name.replaceAll('/','-')); 
        		request = new XMLHttpRequest(); 
		request.open('PUT', 'http://127.0.0.1:48765/upload'); 
		request.send(formData);
    }
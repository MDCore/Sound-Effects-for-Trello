function notify_save(text) {
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = text;
  setTimeout(function() {
    status.textContent = '';
  }, 2000);
}

function fileSelect(e) {
  if (e.target.files.length > 0) {
    var file = e.target.files[0]; // we only want the first one
    var target = e.target.id;

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      base64 = reader.result;
      document.getElementById('soundpreview').innerHTML = '<audio autoplay src="'+base64+'"></audio>';

      var to_save = {};
      to_save[target] = base64;
      chrome.storage.local.set(to_save);

      notify_save(target + ' updated.');
    }


  } else {
    console.log('Please select a file.');
  }
}

var audio_selects = document.getElementsByClassName('audio_select');
Array.prototype.filter.call(audio_selects, function(as){
    as.addEventListener('change', fileSelect, false);
});

window.onload = async () => {
  var rad = document.getElementsByName("loadtype");
  if (rad[0].checked) {
    document.getElementById("addbook__file").style.display = "none";
    document.getElementById("addbook__booktext").style.display = "block";
  }
  if (rad[1].checked) {
    document.getElementById("addbook__file").style.display = "block";
    document.getElementById("addbook__booktext").style.display = "none";
  }
  addbookform.onchange = function (e) {
    var rad = document.getElementsByName("loadtype");
    if (rad[0].checked) {
      document.getElementById("addbook__file").style.display = "none";
      document.getElementById("addbook__booktext").style.display = "block";
    }
    if (rad[1].checked) {
      document.getElementById("addbook__file").style.display = "block";
      document.getElementById("addbook__booktext").style.display = "none";
    }

    addbook__submit.onclick = async function(e) {
      let url="https://apiinterns.osora.ru";
      let text = document.getElementById("addbook__file").files[0]; // our file with book
      let name = document.getElementById("addbook__name").value;
      let data = {
        login: name,
        file: text
      }
      console.log(data);
      let response = await fetch(url, {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(data => console.log('+', data))
      .catch((e) => {
        console.log('Error: ' + e.message);
        console.log(e.response);
      })
    }
  };
};

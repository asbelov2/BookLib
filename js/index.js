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

    addbook__submit.onclick = async function (e) {
      e.preventDefault();
      let url = "https://apiinterns.osora.ru/";
      let bookForm = new FormData(document.forms.addbookform);
      bookForm.append('login', 'anylogin');
      bookForm.append('file', document.getElementById("addbook__file").files[0]);
      
      let response = await fetch(url, {
        method: 'POST',
        body: bookForm
      })
        .then((res) => res.text())
        .then((data) => console.log("+", data))
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        });
    };
  };
};

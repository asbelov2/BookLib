let books = [];

window.onload = async () => {
  if (localStorage.getItem("books") === null) {
    localStorage.setItem("books", JSON.stringify([]));
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  console.log(books);
  var rad = document.getElementsByName("loadtype");
  if (rad[0].checked) {
    document.getElementById("addbook__file").style.display = "none";
    document.getElementById("addbook__namelabel").style.display = "block";
    document.getElementById("addbook__name").style.display = "block";
    document.getElementById("addbook__booktext").style.display = "block";
  }
  if (rad[1].checked) {
    document.getElementById("addbook__file").style.display = "block";
    document.getElementById("addbook__namelabel").style.display = "none";
    document.getElementById("addbook__name").style.display = "none";
    document.getElementById("addbook__booktext").style.display = "none";
  }
  addbookform.onchange = function (e) {
    var rad = document.getElementsByName("loadtype");
    if (rad[0].checked) {
      document.getElementById("addbook__file").style.display = "none";
      document.getElementById("addbook__namelabel").style.display = "block";
      document.getElementById("addbook__name").style.display = "block";
      document.getElementById("addbook__booktext").style.display = "block";
    }
    if (rad[1].checked) {
      document.getElementById("addbook__file").style.display = "block";
      document.getElementById("addbook__namelabel").style.display = "none";
      document.getElementById("addbook__name").style.display = "none";
      document.getElementById("addbook__booktext").style.display = "none";
    }

    addbook__submit.onclick = async function (e) {
      e.preventDefault();
      let url = "https://apiinterns.osora.ru/";
      let bookForm = new FormData(document.forms.addbookform);
      bookForm.append("login", "anylogin");
      let name = document.getElementById("addbook__name").value;
      let text = document.getElementById("addbook__booktext").value;
      console.log(books);
      if (rad[0].checked) {
        let file = new File(
          [
            new Blob([text], {
              type: "text/plain",
            }),
          ],
          name,
          {
            type: "text/plain",
          }
        );
        books.push({'name':file.name, 'text':(await file.text())});
        localStorage.setItem("books", JSON.stringify(books));
        bookForm.append("file", file);
      }
      if (rad[1].checked) {
        let file = document.getElementById("addbook__file").files[0];
        books.push({'name':file.name, 'text':(await file.text())});
        localStorage.setItem("books", JSON.stringify(books));
        bookForm.append("file", file);
      }
      let response = await fetch(url, {
        method: "POST",
        body: bookForm,
      })
        .then((res) => res.text())
        .then((data) => console.log("+", data))
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        });
      console.log(books);
    };
  };
};

let books = [];

window.onload = async () => {
  if (localStorage.getItem("books") === null) {
    localStorage.setItem("books", JSON.stringify([]));
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  renderBooks();

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
        books.push({ name: file.name, text: await file.text() });
        localStorage.setItem("books", JSON.stringify(books));
        bookForm.append("file", file);
      }
      if (rad[1].checked) {
        let file = document.getElementById("addbook__file").files[0];
        books.push({ name: file.name, text: await file.text() });
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
      renderBooks();
    };
  };
};

function renderBooks() {
  document.getElementsByClassName("booklist")[0].innerHTML = "";
  for (let i = 0; i < books.length; ++i) {
    let bookItem = document.createElement("div");
    bookItem.id = "id" + i;
    document.querySelector("#book").content.querySelector("span").innerText =
      books[i].name;

    bookItem.innerHTML = document.getElementById("book").innerHTML;
    document.getElementsByClassName("booklist")[0].appendChild(bookItem);

    document
      .querySelector(".booklist #id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_read"
      ).onclick = async function (e) {
      console.log("book_read");

      document.getElementsByClassName("bookview__textarea")[0].value =
        books[i].text;
      document.getElementsByClassName("bookview__textarea")[0].readOnly = true;
    };
    document
      .querySelector(".booklist #id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_delete"
      ).onclick = async function (e) {
      console.log("book_delete");
      books.splice(i, 1);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    };
    document
      .querySelector(".booklist #id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_complete"
      ).onclick = async function (e) {
      console.log("book_complete");
    };

    document
      .querySelector(".booklist #id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_edit"
      ).onclick = async function (e) {
      console.log("book_edit");
      document.getElementsByClassName("bookview__textarea")[0].readOnly = false;

      let save = document.createElement("input");
      save.type = "button";
      save.value = "Save";
      let cancel = document.createElement("input");
      cancel.type = "button";
      cancel.value = "Cancel";
      save.onclick = async function (e) {
        books[i].text = document.getElementsByClassName(
          "bookview__textarea"
        )[0].value;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
        cancel.remove();
        save.remove();
      };
      cancel.onclick = async function (e) {
        cancel.remove();
        save.remove();
      };
      document.getElementsByClassName("bookview")[0].appendChild(save);
      document.getElementsByClassName("bookview")[0].appendChild(cancel);
    };
  }
}

let books = [];

window.onload = async () => {
  if (localStorage.getItem("books") === null) {
    localStorage.setItem("books", JSON.stringify([]));
  } else {
    books = JSON.parse(localStorage.getItem("books"));
    sortBooks();
  }
  document.getElementsByClassName(
    "menu__item_addbook"
  )[0].onclick = async function (e) {
    document.getElementById("addbookform").style.display = "flex";
    document.getElementsByClassName("bookview")[0].style.display = "none";
  };

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
        books.push({
          name: file.name,
          text: await file.text(),
          time: Date.now(),
          completed: false,
          favorite: false,
        });
        localStorage.setItem("books", JSON.stringify(books));
        bookForm.append("file", file);
      }
      if (rad[1].checked) {
        let file = document.getElementById("addbook__file").files[0];
        books.push({
          name: file.name,
          text: await file.text(),
          time: Date.now(),
          completed: false,
          favorite: false,
        });
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
  document.getElementsByClassName("menu-booklist")[0].innerHTML = "";
  document.getElementsByClassName("menu-favoritebooks")[0].innerHTML = "";
  for (let i = 0; i < books.length; ++i) {
    let bookItem = document.createElement("div");
    bookItem.id = "id" + i;
    document.querySelector("#book").content.querySelector("span").innerText =
      books[i].name;
    bookItem.innerHTML = document.getElementById("book").innerHTML;
    if (books[i].favorite === true) {
      document.getElementsByClassName("menu-favoritebooks")[0].appendChild(bookItem);
    } else {
      document.getElementsByClassName("menu-booklist")[0].appendChild(bookItem);
    }

    if (books[i].completed === true) {
      document
        .querySelector("#id" + i)
        .querySelector("li span").className = "book__title book_completed";
    }

    if (books[i].completed === false) {
      document
        .querySelector("#id" + i)
        .querySelector("li span").className = "book__title book_uncompleted";
    }

    document.querySelector("#id" + i).draggable = true;
    document.querySelector("#id" + i).ondragstart = dragStart;

    //READ
    document
      .querySelector("#id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_read"
      ).onclick = async function (e) {
      document.getElementsByClassName("bookview")[0].style.display = "flex";
      document.getElementById("addbookform").style.display = "none";
      document.getElementsByClassName("bookview__bookname")[0].innerText =
        books[i].name;
      document.getElementsByClassName("bookview__textarea")[0].value =
        books[i].text;
      document.getElementsByClassName("bookview__textarea")[0].readOnly = true;
    };
    //DELETE
    document
      .querySelector("#id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_delete"
      ).onclick = async function (e) {
      books.splice(i, 1);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    };

    //COMPLETE
    document
      .querySelector("#id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_complete"
      ).onclick = async function (e) {
      books[i].completed = true;
      sortBooks();
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    };

    //EDIT
    document
      .querySelector("#id" + i)
      .querySelector(
        ".book-buttons__button.book-buttons__button_edit"
      ).onclick = async function (e) {
      document.getElementsByClassName("bookview")[0].style.display = "flex";
      document.getElementById("addbookform").style.display = "none";
      document.getElementsByClassName("bookview__bookname")[0].innerText =
        books[i].name;
      document.getElementsByClassName("bookview__textarea")[0].value =
        books[i].text;
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

function sortBooks() {
  books.sort(function (a, b) {
    if (a.completed === b.completed) {
      return a.time - b.time;
    } else if (a.completed === true) {
      return -1;
    } else {
      return 1;
    }
  });
}

function dragStart(ev) {
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.setData("Text", ev.target.getAttribute("id"));
  ev.dataTransfer.setDragImage(ev.target, 100, 100);
  return true;
}

function dragEnter(e) {
  e.preventDefault();
  return true;
}
function dragOver(e) {
  e.preventDefault();
}

function dragDropToFav(e) {
  var data = e.dataTransfer.getData("Text");
  books[data.match(/(\d+)/)[0]].favorite = true;
  localStorage.setItem("books", JSON.stringify(books));
  document.getElementsByClassName("menu-favoritebooks")[0].appendChild(document.getElementById(data));
  renderBooks();
  e.stopPropagation();
  return false;
}

function dragDropToList(e) {
  var data = e.dataTransfer.getData("Text");
  books[data.match(/(\d+)/)[0]].favorite = false;
  localStorage.setItem("books", JSON.stringify(books));
  document.getElementsByClassName("menu-booklist")[0].appendChild(document.getElementById(data));
  renderBooks();
  e.stopPropagation();
  return false;
}

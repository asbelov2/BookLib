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
  };
  addbook__submit.onclick = async function(e) {
    let url="https://apiinterns.osora.ru/";
    let file = document.getElementById("addbook__file").nodeValue; // our file with book
    console.log(123);
    let blob = await new Promise(resolve => file.toBlob(resolve));
    console.log(123);
    let response = await fetch(url, {
      method: 'POST',
      body: blob
    });
    console.log(file,response,response.json());

  }
};

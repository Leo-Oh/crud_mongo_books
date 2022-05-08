const API_URL = "http://127.0.0.1:8000";

function saveBook() {
  let id_book = document.getElementById("inp_id"),
    name_book = document.getElementById("inp_name"),
    author_book = document.getElementById("inp_author"),
    pagues_book = document.getElementById("inp_pagues"),
    editorial_book = document.getElementById("inp_editorial");

  if (
    name_book.value.trim().length !== 0 &&
    author_book.value.trim().length !== 0 &&
    pagues_book.value > 49 &&
    pagues_book.value < 4000 &&
    editorial_book.value.trim().length !== 0
  ) {
    let data = {
      //id: String(id_book.value),
      name: String(name_book.value),
      author: String(author_book.value),
      pagues: Number(pagues_book.value),
      editorial: String(editorial_book.value),
    };

    fetch(`${API_URL}/book`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((book) => {
        if (book) {
          id_book.value = "";
          name_book.value = "";
          author_book.value = "";
          pagues_book.value = "";
          editorial_book.value = "";

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your book has been saved",
            text: `ID : ${book.id}`,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need to complete all the fields before sending",
      footer:
        "<b>Fields required:</b><i> name, author, pagues (min: 49 and max: 4000) and editorial</i>",
    });
  }
}

function deleteBook() {
  Swal.fire({
    title: "Insert the id to <b>DELETE</b>",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Find",
    showLoaderOnConfirm: true,
    preConfirm: (id_book) => {
      if (id_book) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {

              fetch(`${API_URL}/book/${id_book}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((book) => {
                if (book) {
                  swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "The book has been deleted.",
                    "success",
                  );
                }
              });

            
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your book has not been deleted :)",
                "error",
              );
            }
          });


        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You did not provided a ID',
        })
      }
    },
    
  });


}

function updateBook() {
  let id_book = document.getElementById("inp_id"),
    name_book = document.getElementById("inp_name"),
    author_book = document.getElementById("inp_author"),
    pagues_book = document.getElementById("inp_pagues"),
    editorial_book = document.getElementById("inp_editorial");
    
    if (
      id_book.value.trim().length !== 0 &&
      name_book.value.trim().length !== 0 &&
      author_book.value.trim().length !== 0 &&
      pagues_book.value > 49 &&
      pagues_book.value < 4000 &&
      editorial_book.value.trim().length !== 0
    ) {



  let data = {
    id: String(id_book.value),
    name: String(name_book.value),
    author: String(author_book.value),
    pagues: Number(pagues_book.value),
    editorial: String(editorial_book.value),
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You will update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update  it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {

        console.log(data);
        console.log(JSON.stringify(data));

        fetch(`${API_URL}/book/${id_book.value}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error:", error);
          })
          .then((book) => {
            
            if (book) {
              id_book.value = "";
              name_book.value = "";
              author_book.value = "";
              pagues_book.value = "";
              editorial_book.value = "";
    
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your book has been edited",
                text: `ID : ${book.id}`,
                showConfirmButton: false,
                timer: 3000,
              });
            }

          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your book has not updated :)",
          "error",
        );
      }
    });

  }else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need to complete all the fields before edit it",
      footer:
        "<b>Fields required:</b><i> id,name, author, pagues (min: 49 and max: 4000) and editorial</i>",
    });
  }
}

function findBooks() {
  fetch(`${API_URL}/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    })
    .then((book) => {
      console.log("Book", book);

      const $tbody_data = document.querySelector("#tbody_data");
      $tbody_data.innerHTML = "";

      book.forEach((element) => {
        const $tr = document.createElement("tr");
        document.getElementById("tbody_data").appendChild($tr);

        const $th_id = document.createElement("th");
        $th_id.textContent = element["id"];
        $tr.appendChild($th_id);

        const $td_name = document.createElement("td");
        $td_name.textContent = element["name"];
        $tr.appendChild($td_name);

        const $td_author = document.createElement("td");
        $td_author.textContent = element["author"];
        $tr.appendChild($td_author);

        const $td_pagues = document.createElement("td");
        $td_pagues.textContent = element["pagues"];
        $tr.appendChild($td_pagues);

        const $td_editorial = document.createElement("td");
        $td_editorial.textContent = element["editorial"];
        $tr.appendChild($td_editorial);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Search completed",
          showConfirmButton: false,
          timer: 2000,
        });
      });
    });
}

function findBookById() {
  Swal.fire({
    title: "Insert the id to find",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Find",
    showLoaderOnConfirm: true,
    preConfirm: (id_book) => {
      fetch(`${API_URL}/book/${id_book}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((book) => {
          console.log("Book", book);

          const $tbody_data = document.querySelector("#tbody_data");
          $tbody_data.innerHTML = "";

          const $tr = document.createElement("tr");
          document.getElementById("tbody_data").appendChild($tr);

          const $th_id = document.createElement("th");
          $th_id.textContent = book["id"];
          $tr.appendChild($th_id);

          const $td_name = document.createElement("td");
          $td_name.textContent = book["name"];
          $tr.appendChild($td_name);

          const $td_author = document.createElement("td");
          $td_author.textContent = book["author"];
          $tr.appendChild($td_author);

          const $td_pagues = document.createElement("td");
          $td_pagues.textContent = book["pagues"];
          $tr.appendChild($td_pagues);

          const $td_editorial = document.createElement("td");
          $td_editorial.textContent = book["editorial"];
          $tr.appendChild($td_editorial);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

function clear_fields() {
  let id_book = document.getElementById("inp_id"),
    name_book = document.getElementById("inp_name"),
    author_book = document.getElementById("inp_author"),
    pagues_book = document.getElementById("inp_pagues"),
    editorial_book = document.getElementById("inp_editorial");

  id_book.innerText.value = "";
  name_book.innerText.value = "";
  author_book.innerText.value = "";
  pagues_book.innerText.value = "";
  editorial_book.innerText.value = "";
}

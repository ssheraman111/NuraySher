let API = "http://localhost:8001/practice";
let list = document.querySelector(".list");
let title = document.querySelector("#title");
let descr = document.querySelector("#descr");
let photo = document.querySelector("#photo");

//Inputs as a massive
let editInp = document.querySelectorAll(".inpEdit");
let saveBtn = document.querySelector("#saveBtn");
// console.log(list);

btn.addEventListener("click", async function () {
  let data = {
    title: title.value,
    descr: descr.value,
    photo: photo.value,
  };
  if (!data.title.trim() || !data.descr.trim() || !data.photo.trim()) {
    alert("fill the blanks");
    return;
  }
  console.log("success");
  await fetch(API, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(data),
  });
  (title.value = ""), (descr.value = ""), (photo.value = "");
  render();
});
render();
async function render() {
  list.innerHTML = "";
  let kew = await fetch(`${API}?q&_page&_limit=2`);

  //   let res = await fetch(`${api}?q&_page=${currentPage}&_limit=3`);

  let res = await kew.json();
  //   console.log(res);
  res.forEach((element) => {
    // console.log(element.title);
    list.innerHTML += `
    <div class="content content-1">
    <img class="image" src="${element.photo}"/>
    <h2>${element.title}</h2>
    <p>${element.descr}</p>
    <a onclick="remove(${element.id})" href="#">Delete</a>

    <button  data-bs-toggle="modal" data-bs-target="#haroo" class="btn btn-success">Edit</button>
        
    </div>
    `;
  });
}

async function remove(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  console.log("remove clicked");

  let haro = await fetch(API);
  let res = await haro.json();
  console.log("hey");
  render(res);
}

// function mod() {}
// saveBtn.addEventListener("click", () => {
//   editInp.value.forEach((item) => {
//     let editObj = {
//       newTitle: item.title,
//       newDesc: item.descr,
//       newPhoto: item.photo,
//     };
//     console.log(editObj);
//   });
// });

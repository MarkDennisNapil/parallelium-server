function fetchPost(items) {
    items = [
      {id: 1, title: "My Face", details: "jfkhgihvkdhg", files: ["pic1.png"]},
      {id: 2, title: "My Pet", details: "djifhgcjpasof", files: ["pic2.png"]},
      {id: 3, title: "My House", details: "dfsdfdf", files: ["pic3.png"]},
      {id: 4, title: "My Code", details: "dfsdfsdfr", files: ["pic4.png", "pic5.jpg", "pic6.png"]},
    ]
    return items;
  }
  const items = fetchPost();
  items[2].files.push("pic3A.jpg");
  console.log(items);
console.log(items[3].files.length);
  

let menus = [];
fetch("http://localhost:3006/api/v1/category").then((response) => {
  menus = response.data;
});

export default menus;

export const menuItemsData = [
  {
    title: "Main",
    url: "/",
  },
  {
    title: "All Products",
    url: "/products",
  },
  {
    title: "Collections",
    url: null,
    submenu: menus,
  },
];

import { lazy, useEffect } from "react";
const Dashboard = lazy(() => import("../views/Dashboard"));
const Products = lazy(() => import("../modules/Products"));
const Category = lazy(() => import("../modules/Categories"));
const ProductType = lazy(() => import("../modules/ProductType"));
const Brand = lazy(() => import("../modules/Brand"));
const Size = lazy(() => import("../modules/Sizes"));
const Orders = lazy(() => import("../modules/Orders"));
import { MdFormatSize, MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { MdBrandingWatermark } from "react-icons/md";

export const routes_url = [
  {
    key: "1",
    path: "/dashboard",
    label: "Dashboard",
    element: <Dashboard />,
    isPrivate: true,
    icon: <MdOutlineDashboard />,
    // children:
  },
  {
    key: "6",
    path: "/order",
    label: "Orders",
    element: <Orders />,
    isPrivate: true,
    icon: <FaShoppingCart />,
    // children:
  },
  {
    key: "2",
    path: "/products",
    label: "Products",
    element: <Products />,
    isPrivate: true,
    icon: <FaShoppingCart />,
    // children:
  },
  {
    key: "3",
    path: "/category",
    label: "Category",
    element: <Category />,
    isPrivate: true,
    icon: <MdCategory />,
    // children:
  },
  {
    key: "4",
    path: "/product-type",
    label: "Product Types",
    element: <ProductType />,
    isPrivate: true,
    icon: <AiFillProduct />,
    // children:
  },
  {
    key: "5",
    path: "/brand",
    label: "Brand",
    element: <Brand />,
    isPrivate: true,
    icon: <MdBrandingWatermark />,
    // children:
  },
  {
    key: "5",
    path: "/size",
    label: "Size",
    element: <Size />,
    isPrivate: true,
    icon: <MdFormatSize />,

    // children:
  },
];

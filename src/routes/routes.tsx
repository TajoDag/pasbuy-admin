import { Children, lazy } from "react";
const Dashboard = lazy(() => import("../views/Dashboard"));
const Products = lazy(() => import("../modules/Products"));
const Category = lazy(() => import("../modules/Categories"));
const ProductType = lazy(() => import("../modules/ProductType"));
const Brand = lazy(() => import("../modules/Brand"));
const Size = lazy(() => import("../modules/Sizes"));
const Orders = lazy(() => import("../modules/Orders"));
const Accounts = lazy(() => import("../modules/Accounts"));
const Settings = lazy(() => import("../modules/Settings"));
import { MdFormatSize, MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { MdBrandingWatermark } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import TranslateTing from "../components/Common/TranslateTing";
import { IoMdSettings } from "react-icons/io";

export const routes_url = [
  {
    key: "1",
    path: "/dashboard",
    label: <TranslateTing text="Dashboard" />,
    element: <Dashboard />,
    isPrivate: true,
    icon: <MdOutlineDashboard />,
  },
  {
    key: "usersManagemnet",
    label: <TranslateTing text="Accounts Management" />,
    children: [
      {
        key: "8",
        path: "/account",
        label: <TranslateTing text="Accounts" />,
        element: <Accounts />,
        isPrivate: true,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "productManagement",
    label: <TranslateTing text="Products Management" />,
    children: [
      {
        key: "2",
        path: "/products",
        label: <TranslateTing text="Products" />,
        element: <Products />,
        isPrivate: true,
        icon: <FaShoppingCart />,
      },
      {
        key: "3",
        path: "/category",
        label: <TranslateTing text="Categories" />,
        element: <Category />,
        isPrivate: true,
        icon: <MdCategory />,
      },
      {
        key: "4",
        path: "/product-type",
        label: <TranslateTing text="Product Types" />,
        element: <ProductType />,
        isPrivate: true,
        icon: <AiFillProduct />,
      },
      {
        key: "5",
        path: "/brand",
        label: <TranslateTing text="Brand" />,
        element: <Brand />,
        isPrivate: true,
        icon: <MdBrandingWatermark />,
      },
      // {
      //   key: "7",
      //   path: "/size",
      //   label: "Size",
      //   element: <Size />,
      //   isPrivate: true,
      //   icon: <MdFormatSize />,
      // },
    ],
  },
  {
    key: "orderManagemnet",
    label: <TranslateTing text="Orders Management" />,
    children: [
      {
        key: "6",
        path: "/order",
        label: <TranslateTing text="Orders" />,
        element: <Orders />,
        isPrivate: true,
        icon: <FaShoppingCart />,
      },
    ],
  },
  {
    key: "configManagement",
    label: <TranslateTing text="Config Website" />,
    children: [
      // {
      //   key: "7",
      //   path: "/hotline",
      //   label: "Hotline",
      //   element: <Orders />,
      //   isPrivate: true,
      //   icon: <FaShoppingCart />,
      // },

      {
        key: "8",
        path: "/settings",
        label: <TranslateTing text="Settings" />,
        element: <Settings />,
        isPrivate: true,
        icon: <IoMdSettings />,
      },
    ],
  },
];

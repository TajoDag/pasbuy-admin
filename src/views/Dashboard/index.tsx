import { Row } from "antd";
import { useEffect, useState } from "react";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { useDispatch } from "react-redux";
import { getListTotal } from "../../modules/Products/apis";
import { getAllBrand } from "../../modules/Brand/utils/services";
import { getAllCategory } from "../../modules/Categories/utils/services";

const Dashboard = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalBrand, setTotalBrand] = useState(0);
  const [totalCate, setTotalCate] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      try {
        let payload :any
        const rp = await getListTotal(payload)
        if (rp.status) {
          setTotalProduct(rp.result.pagination.total)
        }
      } catch (err) {
        setTotalProduct(0)
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    const getListBrand = async () => {
      dispatch(startLoading());
      try {
        const rp = await getAllBrand()
  
        if (rp.status) {
          setTotalBrand(rp.result.length)
        }
      } catch (err) {
        setTotalBrand(0)
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    const getListCate= async () => {
      dispatch(startLoading());
      try {
        const rp = await getAllCategory()

        if (rp.status) {
          setTotalCate(rp.result.length)
        }
      } catch (err) {
        setTotalCate(0)
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    getList();
    getListBrand();
    getListCate();
  }, []);

  const data = [
    {
      count: totalProduct,
      label: "Customer",
      className: "bg-grad-2",
    },
    {
      count: 214,
      label: "Order",
      className: "bg-grad-3",
    },
    {
      count: totalCate,
      label: "Product category",
      className: "bg-grad-1",
    },
    {
      count: totalBrand,
      label: "Product brand",
      className: "bg-grad-4",
    },
  ];
  return (
    <div>
      <div className="row gutters-10">
        {data.map((item, index) => (
          <div className="col-6" key={index}>
            <div
              className={`text-white rounded-lg mb-4 overflow-hidden ${item.className}`}
            >
              <div className="px-3 pt-3">
                <div className="opacity-50">
                  <span className="fs-12 d-block">Total</span>
                  {item.label}
                </div>
                <div className="h3 fw-700 mb-3">{item.count}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="rgba(255,255,255,0.3)"
                  fillOpacity="1"
                  d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;

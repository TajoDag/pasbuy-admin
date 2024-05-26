import { Card, Image } from "antd";
import React from "react";

const Settings = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card title="Logos" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
          <div>
            <h3>Logo Header</h3>
            <Image
              width={200}
              src="https://www.pasbuy.cyou/public/uploads/all/1AZ1FU1wB4TY7AwOvrhhaCHg8kLRsm1NV78YwxJC.png"
            />
          </div>
          <div>
            <h3>Logo Footer</h3>
            <Image
              width={200}
              src="https://www.pasbuy.cyou/public/uploads/all/Pb40YAYGtG8kNwCDTQZZ3w84k1bufpt57NCcS9dj.jpg"
            />
          </div>
        </div>
      </Card>
      <Card title="Banners" style={{ width: "100%" }}></Card>
      <Card title="Images advertisement" style={{ width: "100%" }}></Card>
      <Card title="Config live chat" style={{ width: "100%" }}></Card>
    </div>
  );
};

export default Settings;

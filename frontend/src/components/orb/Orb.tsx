import "./orb.scss";
const Orb = () => {
  const divs = [];

  for (let i = 0; i < 300; i++) {
    divs.push(<div key={i} className="c"></div>);
  }
  return (
    <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
      {divs}
    </div>
  );
};

export default Orb;

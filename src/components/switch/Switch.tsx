import "./Switch.css";

type props = {
    difficultySetting: any
}
export default function Switch(props: props) {
    const { difficultySetting } = props
  return (
    <div className="tooltip">
      <label className="switch">
        <span className="tooltiptext">Easy Mode</span>
        <input defaultChecked={true} onClick={() => difficultySetting()} type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

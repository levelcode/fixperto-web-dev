import React, { useState } from "react";
const FileUpload = (props) => {
	const [file, setFile] = useState("");
	const onChange = e => {
		props["onChange"](e.target.files[0]);
		var reader = new FileReader();
		reader.onload = function (e) { setFile(e.target.result); }
		reader.readAsDataURL(e.target.files[0]);
	}
	return (
		<React.Fragment>
			<form >
				<div style={{ marginBottom: 5 + "px" }}>
					<img src={(!props['clear']) ? file : "../../assets/icon.png"} className="img_avatar" alt="Avatar" style={{ width: 100 + "px", height: 100 + "px" }} />
				</div>
				<div>
					<input type="file" style={{ width: 0.1 + "px", height: 0.1 + "px", opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}
						id={(props["id"]) ? props["id"] : "file_upload"} onChange={onChange} accept="image/png, .jpeg, .jpg, image/gif" />
					<div style={{ backgroundColor: "#DDDDDD", cursor: "pointer", width: 100 + "px", margin: "auto" }}>
						<label htmlFor={(props["id"]) ? props["id"] : "file_upload"} style={{ color: "#676767", cursor : "pointer" }}>{(props["texto"]) ? props["texto"] : "Imagen"}</label>
					</div>
				</div>
			</form>
		</React.Fragment>
	)
}
export default FileUpload
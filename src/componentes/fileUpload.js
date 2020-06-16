import React, { useState } from "react";
const FileUpload = (props) => {
	const [file, setFile] = useState("");
	const onChange = e => {
		var reader = new FileReader();
		reader.onload = function (e) { setFile(e.target.result); props["onChange"](e.target.result); }
		reader.readAsDataURL(e.target.files[0]);
	}
	return (
		<React.Fragment>
			<form>
				<div style={{ marginBottom: 5 + "px" }}>
					<img src={(file) ? file : "../../avatar.jpg"} class=" img_avatar" alt="Avatar" />
				</div>
				<div>
					<input type="file" style={{ width: 0.1 + "px", height: 0.1 + "px", opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}
						id="img_avatar" onChange={onChange} accept="image/png, .jpeg, .jpg, image/gif" />
					<div style={{ backgroundColor: "#DDDDDD", cursor: "pointer", width: 100 + "px", margin: "auto" }}>
						<label htmlFor="img_avatar" style={{ color: "#676767" }}>Imagen</label>
					</div>
				</div>
			</form>
		</React.Fragment>
	)
}
export default FileUpload
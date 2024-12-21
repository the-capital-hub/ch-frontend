import "./ModalBSContainer.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import CommunityChatBg from "../../../../Images/Chat/CommunityChatBg.png";

function ModalBSContainer({
	id,
	label,
	children,
	showModal,
	isStatic = true,
	modalXl = false,
	isFade = true,
}) {
	const theme = useSelector(selectTheme);
	return (
		<div
			className={`modal ${isFade ? " fade " : ""} `}
			// style={{ display: showModal ? "block" : "none" }}
			id={id}
			data-bs-backdrop={`${isStatic ? "static" : " "}`}
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby={label || "modalLabel"}
		>
			<div
				className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${
					modalXl ? "modal-xl" : ""
				}`}
				style={{
					backgroundColor: theme === "dark" ? "#1E1F24" : "white",
					height: "100vh",
					margin: 0,
					maxWidth: "100%",
				}}
			>
				<div
					className="modal-content"
					style={{
						// backgroundImage: `url(${CommunityChatBg})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						minHeight: "100vh",
						border: "none",
						borderRadius: 0,
						backgroundColor: theme === "dark" ? "#1E1F24" : "white",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default ModalBSContainer;

// import "./ModalBSContainer.scss";
// import { useSelector } from "react-redux";
// import { selectTheme } from "../../../../Store/features/design/designSlice";
// import CommunityChatBg from "../../../../Images/Chat/CommunityChatBg.png";

// function ModalBSContainer({
// 	id,
// 	label,
// 	children,
// 	showModal,
// 	isStatic = true,
// 	modalXl = false,
// 	isFade = true,
// }) {
// 	const theme = useSelector(selectTheme);
// 	return (
// 		<div
// 			className={`modal ${isFade ? "fade" : ""}`}
// 			id={id}
// 			data-bs-backdrop={`${isStatic ? "static" : ""}`}
// 			data-bs-keyboard="false"
// 			tabIndex="-1"
// 			aria-labelledby={label || "modalLabel"}
// 		>
// 			<div
// 				className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${
// 					modalXl ? "modal-xl" : ""
// 				}`}
// 				style={{
// 					backgroundColor: theme === "dark" ? "#1E1F24" : "white",
// height: "100vh",
// margin: 0,
// maxWidth: "100%",
// 				}}
// 			>
// 				<div
// 					className="modal-content"
// 					style={{
// backgroundImage: `url(${CommunityChatBg})`,
// backgroundSize: "cover",
// backgroundPosition: "center",
// backgroundRepeat: "no-repeat",
// minHeight: "100vh", // Add this
// border: "none", // Add this
// borderRadius: 0, // Add this
// backgroundColor: theme === "dark" ? "#1E1F24" : "white",
// 					}}
// 				>
// 					{children}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ModalBSContainer;

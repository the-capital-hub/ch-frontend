import { X } from "lucide-react";
import "./PaymentSuccessPopup.scss";

export default function PaymentSuccessPopup({ amount, onClose }) {
	return (
		<div className="payment-success-popup">
			<div className="popup-content">
				<button className="close-button" onClick={onClose}>
					<X size={24} />
				</button>
				<div className="success-icon">✅</div>
				<h2>Payment Successful!</h2>
				<p>Your payment of ₹{amount} has been processed successfully.</p>
				<button className="ok-button" onClick={onClose}>
					OK
				</button>
			</div>
		</div>
	);
}

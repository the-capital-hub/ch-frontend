// Chech Top Voice Expiry
export const checkTopVoiceExpiry = (topVoiceExpiry) => {
	const today = new Date();
	const expiryDate = new Date(topVoiceExpiry);
	return today < expiryDate; // Returns true if today is before expiryDate, false otherwise
};

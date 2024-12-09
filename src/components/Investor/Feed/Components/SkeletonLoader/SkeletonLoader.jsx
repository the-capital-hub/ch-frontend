import React from "react";
import { ImFire } from "react-icons/im";
import { FaShare, FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import "./SkeletonLoader.scss";

const SkeletonLoader = () => {
	return (
		<div className="skeleton-loader">
			<div className="profile-info">
				<div className="profile-image skeleton-item"></div>
				<div className="profile-details">
					<div className="skeleton-item name"></div>
					<div className="skeleton-item location"></div>
					<div className="skeleton-item date"></div>
				</div>
			</div>
			<div className="content-area">
				<div className="skeleton-item title"></div>
				<div className="skeleton-item text"></div>
				<div className="skeleton-item text"></div>
				<div className="skeleton-item text"></div>
				<div className="skeleton-item text"></div>
				<div className="skeleton-item text"></div>
			</div>
			<div className="interaction-buttons">
				<div className="skeleton-item button">
					<ImFire />
				</div>
				<div className="skeleton-item button">
					<FaRegCommentDots />
				</div>
				<div className="skeleton-item button">
					<FaShare />
				</div>
				<div className="skeleton-item button">
					<BiRepost />
				</div>
				<div className="skeleton-item button">
					<FaRegBookmark />
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;

import { useRef, useState, useEffect } from "react";
import "../Syndicates/Syndicates.scss";
import "./MySchedule.scss";
import ViewSelect from "../../../components/NewInvestor/MyScheduleComponents/ViewSelect";
import CalendarContainer from "../../../components/NewInvestor/MyScheduleComponents/CalenderContainer";
import Meetings from "../../../components/NewInvestor/MyScheduleComponents/Meetings";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
	selectIsMobileView,
	selectTheme,
	setPageTitle,
} from "../../../Store/features/design/designSlice";
import { useSearchParams } from "react-router-dom";
import { selectUserOneLinkId } from "../../../Store/features/user/userSlice";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import moment from "moment";
import Events from "../../../components/NewInvestor/MyScheduleComponents/Events";
import Available from "../../../components/NewInvestor/MyScheduleComponents/Available";
import EventDetails from "../../../components/NewInvestor/MyScheduleComponents/EventDetails";
import axios from "axios"; // Axios for making API calls
import { environment } from "../../../environments/environment";

const MEETINGTYPES = ["Event types", "Scheduled events", "Calendar sync"];
const baseUrl = environment.baseUrl;
export default function MySchedule() {
	const theme = useSelector(selectTheme);
	const oneLinkId = useSelector(selectUserOneLinkId);
	const isMobileView = useSelector(selectIsMobileView);
	const [meeting, setMeeting] = useState({});
	const viewReq = useRef();
	const [screen, setScreen] = useState("");
	const [view, setView] = useState("month");
	const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
	const [events, setEvents] = useState([]); // State to hold fetched events
	const dispatch = useDispatch();

	// Fetch events from Google Calendar when the component mounts
	useEffect(() => {
		fetchEvents();
	}, []);

  // Fetch existing events from Google Calendar API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/calendar/events`);
      setEvents(response.data); // Store the fetched events in state
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events");
    }
  };

	// Update the document title and page title in Redux
	useEffect(() => {
		document.title = "Schedule | The Capital Hub";
		dispatch(setPageTitle("My Schedule"));
	}, [dispatch]);

	// Adjust view based on screen size
	useEffect(() => {
		if (isMobileView) {
			setView("day");
		}
	}, [isMobileView]);

	const [searchParams, setSearchParams] = useSearchParams();
	const isView = searchParams.get("view");

	useEffect(() => {
		if (isView === "true") {
			viewReq.current.click();
			searchParams.delete("view");
			setSearchParams(searchParams);
		}
	}, [isView, searchParams, setSearchParams]);

	return (
		<MaxWidthWrapper>
			<div className="mySchedule__wrapper">
				{/* Onboarding popup */}
				<TutorialTrigger
					steps={investorOnboardingSteps.mySchedulePage}
					className={"mb-3"}
				/>

				<section
					className="section__wrapper rounded-4 mb-3 pb-5 gap-5"
					style={{ backgroundColor: "transparent" }}
				>
					{/* Header with buttons */}
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-center px-3 pt-3">
						<h4 className="typography">Schedule events</h4>
						<div className="mt-3 mt-lg-0">
							<button
								className="btn btn-gray lh-1 me-2 rounded-5"
								style={{ padding: "10px 20px" }}
								onClick={() => {
									setScreen("Edit Available");
								}}
							>
								Edit Available
							</button>
							<button
								className="btn btn-investor lh-1 me-2 rounded-5"
								style={{ padding: "10px 20px" }}
								onClick={() => {
									setScreen("Create Meeting");
								}}
							>
								Create Meeting
							</button>
						</div>
					</div>

					<div
						className="schedule__container px-md-3"
						style={{ paddingTop: "1.5rem" }}
					>
						<div className="calender__div">
							{/* Calendar component to display events */}
							<CalendarContainer
								view={view}
								setView={setView}
								oneLinkId={oneLinkId}
								date={date}
								setDate={setDate}
								setScreen={setScreen}
								setMeeting={setMeeting}
								events={events} // Pass events to the calendar
							/>
						</div>

						{/* Meetings section */}
						<div
							className="meetings__div p-3 border rounded-4 d-flex flex-column gap-3"
							style={{
								backgroundColor: theme === "dark" ? "#141718" : "#fff",
								maxWidth: "600px",
								width: "100%",
							}}
						>
							{!screen && <p className="typography">Menu</p>}
							{!screen &&
								MEETINGTYPES.map((type) => {
									return (
										<Meetings
											key={type}
											meetingType={type}
											meetingsData={events} // Display fetched events
											view={view}
											setScreen={setScreen}
										/>
									);
								})}
							{screen === "Edit Available" ? (
								<Available setScreen={setScreen} />
							) : screen === "Event Details" ? (
								<EventDetails setScreen={setScreen} meeting={meeting} />
							) : null}
						</div>
					</div>
					<Events oneLinkId={oneLinkId} />
				</section>
			</div>
		</MaxWidthWrapper>
	);
}
